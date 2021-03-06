'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project')
const Database = use('Database')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {

  async index ({ }) {
    const projects = await Project.query().with('user').fetch()

    return projects

  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findBy('id', params.id)

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findByOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project

  }

  async destroy ({ params }) {
    const project = await Project.findByOrFail(params.id)

    project.delete()
  }

  async deleteAll ({ }) {
    await Database.from('projects').delete()

  }
}

module.exports = ProjectController
