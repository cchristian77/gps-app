import express from "express";
import {HTTPStatusCode} from "../../helper/status.code.js";
import ApiResponse from "../../helper/api.response.js";
import GpsService from "./gps.service.js";
import {getGPSDetailResponseDTO, getGpsIndexResponseDTO} from "../../dto/gps.dto.js";

const gpsService = new GpsService()

/**
 * Retrieves a paginated list of GPS data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise} A promise that resolves to the response status and data.
 *
 * @throws {Error} If an error occurs while fetching the GPS data.
 */
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

/**
 * retrieve and display GPS details.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Promise} - A promise that resolves to the response sent back to the client.
 */
const show = async (req, res, next) => {
  try {
    const gps = await gpsService.findByUuid(req.params.uuid)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      getGPSDetailResponseDTO(gps)
    ))
  } catch (err) {
    next(err)
  }
}

/**
 * a router instance
 *
 * @memberof express
 */
const router = new express.Router()
router.get("/", index)
router.get("/:uuid", show)

export default router
