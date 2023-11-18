import express from "express";
import {HTTPStatusCode} from "../../helper/status.code.js";
import ApiResponse from "../../helper/api.response.js";
import GpsService from "./gps.service.js";
import {getGPSDetailResponseDTO, getGpsIndexResponseDTO} from "../../dto/gps.dto.js";

const gpsService = new GpsService()

const index = async (req, res, next) => {
  try {
    const { gpses, pagination } = await gpsService.findAll(req)

    return res.status(HTTPStatusCode.OK).json(
      new ApiResponse.DataPagination(getGpsIndexResponseDTO(gpses), pagination.getMeta())
    )
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
