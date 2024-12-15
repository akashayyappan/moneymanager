import express from 'express';
import Vendor from '../db/models/vendor.js';
import Response from '../model/response.js';

const vendorRouter = express.Router();

vendorRouter.get('/', (req, res) => {
  Vendor.find().then((vendorData) => {
    res.send(Response('Vendor retrieved successfuly', vendorData));
  }).catch(err => res.status(500).send(Response('Failed to retrieve Vendor data')));
});

vendorRouter.post('/', (req, res) => {
  const { name, shortName, description } = req.body;
  const vendor = new Vendor({
    name,
    shortName,
    description
  });

  vendor.save().then((vendorData) => {
    res.send(Response('Vendor save successfully'));
  }).catch(err => res.status(500).send(Response('Failed to save Vendor')));
});

vendorRouter.delete('/', (req, res) => {
  const { id } = req.body;
  const errFun = (err) => {
    res.status(500).send(Response('Failed to delete vendor data'));
  }

  Vendor.findOne({ _id: id }).then((vendor) => {
    vendor.deleteOne().then((vendorResponse) => {
      res.send(Response('Vendor data deleted Successfuly'));
    }).catch(errFun);
  }).catch(errFun);
})

export default vendorRouter;