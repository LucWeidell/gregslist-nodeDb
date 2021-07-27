import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  /**
   * Sends all cars to a client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const cars = await carsService.getAll()
      // NOTE the function ends after res.send ALWAYS
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends car by id client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const car = await carsService.getById(req.params.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Adds car from client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async create(req, res, next) {
    try {
      const car = await carsService.create(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Edits car by id from client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const car = await carsService.edit(req.body)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Removes car by id from client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async delete(req, res, next) {
    try {
      await carsService.delete(req.params.id)
      res.send({ message: 'Successfully Deleted Car' })
    } catch (error) {
      next(error)
    }
  }
}
