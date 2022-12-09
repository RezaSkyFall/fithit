import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../data/dbConnect";
import EstateModel from "../../../models/EstateModel";
import { IEstate } from "../../../types/IEstate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let estate = await EstateModel.findById(req.query.id);
        res.status(200).json(estate);
      } catch (error) {
        res.status(400).json({ success: false, err: error });
      }
      break;

    case "POST":
      try {
        let estate;

        let _body: IEstate = req.body;
        estate = await EstateModel.create(_body);
        await estate.save();

        res.status(200).json(estate);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ success: false, err: error, request: req.query });
      }
      break;

    case "PATCH":
      try {
        let estate = await EstateModel.findByIdAndUpdate(
          req.query.id,
          req.body
        );

        res.status(200).json(estate);
      } catch (error) {
        res
          .status(400)
          .json({ success: false, err: error, request: req.query });
      }
      break;

    case "Delete":
      try {
        let respon = await EstateModel.findByIdAndDelete(req.query);
        res.status(200).json(respon);
      } catch (error) {
        res.status(400).json({ success: false, err: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
