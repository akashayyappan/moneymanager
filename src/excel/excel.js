import Excel from 'exceljs';
import Statement from '../db/models/statement.js';

const readExcelFile = async (data, user) => {
  console.log('reading xlsx');
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(data);
  const worksheet = workbook.worksheets[0];

  let rowIndex = -1;
  let insertedCount = 0;
  let totalCount = 0;
  while (true) {
    console.log('iterating rows');
    rowIndex += 1;
    const row = worksheet.getRow(rowIndex).values;
    if (isNaN(row[2])) {
      console.log('not a number skipping');
      continue;
    }
    totalCount += 1;
    console.log('trying to insert');
    try {
      const rowInserted = await newStatement(row, user);
      console.log('insert: ', rowInserted);
      if (rowInserted) {
        insertedCount += 1;
        console.log(`${insertedCount} statement inserted`);
      }
    } catch (err) {
      console.log('Error while inserting new statement', err);
    }

    if (rowIndex === worksheet.actualRowCount) {
      break;
    }
  }

  return [totalCount, insertedCount];
}

const newStatement = async (row, user) => {
  const dateSplit = row[4].split('/');
  const date = new Date();
  date.setDate(dateSplit[0]);
  date.setMonth(dateSplit[1] - 1);
  date.setFullYear(dateSplit[2]);

  const statement = new Statement({
    date: date.getTime(),
    bank: 'ICICI Bank',
    balance: +row[9],
    createdBy: user?._id || 'akash',
    description: row[6],
    withrawAmount: +row[7],
    depositAmount: +row[8],
    vendorName: ''
  });

  const existingStatement = await Statement.findOne({
    bank: statement.bank, balance: statement.balance,
    withrawAmount: statement.withrawAmount, depositAmount: statement.depositAmount
  });
  if (existingStatement) {
    return false;
  }
  await statement.save();
  return true;
}

export default readExcelFile;