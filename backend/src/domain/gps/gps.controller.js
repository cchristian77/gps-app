import express from "express";
import {HTTPStatusCode} from "../../helper/status.code.js";
import ApiResponse from "../../helper/api.response.js";
import {validation} from "../../validation/validation.js";
import {authMiddleware} from "../../middleware/auth.js";
import GpsService from "./gps.service.js";
import {getGPSDetailResponseDTO, getGpsIndexResponseDTO} from "../../dto/gps.dto.js";
import Pagination from "../../helper/pagination.js";

const gpsService = new GpsService()

const index = async (req, res, next) => {
  try {
    const gpses = await gpsService.findAll(req)

    let pagination = new Pagination(parseInt(req.query.page), parseInt(req.query.per_page))

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      getGpsIndexResponseDTO(gpses, pagination)
    ))
  } catch (err) {
    next(err)
  }
}

const show = async (req, res, next) => {
  try {
    const gps = await gpsService.findByCode(req.params.code)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      getGPSDetailResponseDTO(gps)
    ))
  } catch (err) {
    next(err)
  }
}

const router = new express.Router()
router.get("/", index)
router.get("/:code", show)

export default router
