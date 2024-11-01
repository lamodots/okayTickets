import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import Ticket from "../models/ticketModel.js"



// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
export const getTickets = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)

  if(!user){
    res.status(401) 
    throw new Error("Not Authorized")
  }

  const tickets = await Ticket.find({user: id})
  res.status(200).json(tickets)
})

// @desc    Create new ticket
// @route   POST /api/tickets/
// @access  Private
export const createTicket = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  const {product, description} = req.body

  if(!user){
    res.status(401)
    throw new Error("Not Authorized")
  }

  if(!product || !description){
    res.status(400)
    throw new Error("Please add a product and description")
  }

  const ticket = await Ticket.create({
    user: id,
    product,
    description,
    status: "new"
  })
  
  res.status(201).json(ticket)
})

// @desc    Get a single ticket
// @route   GET /api/ticket/:id
// @access  Private
export const getTicket = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  
  if(!user){
    res.status(401)
    throw new Error("Not Authorized")
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(400)
    throw new Error("Ticket Not found")
  }

  if(ticket.user.toString() !== id){
    res.status(401)
    throw new Error("Not Authorized")
  }

  res.status(200).json(ticket)
})

// @desc    Delete single ticket
// @route   DELETE /api/ticket/:id
// @access  Private
export const deleteTicket = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  
  if(!user){
    res.status(401)
    throw new Error("Not Authorized")
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(400)
    throw new Error("Ticket Not found")
  }

  if(ticket.user.toString() !== id){
    res.status(401)
    throw new Error("Not Authorized")
  }

  await ticket.remove()

  res.status(200).json({message: "Ticket Deleted Successfully"})
})

// @desc    Update single ticket
// @route   PUT /api/ticket/:id
// @access  Private
export const updateTicket = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  const {} = req.body
  
  if(!user){
    res.status(401)
    throw new Error("Not Authorized")
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(400)
    throw new Error("Ticket Not found")
  }

  if(ticket.user.toString() !== id){
    res.status(401)
    throw new Error("Not Authorized")
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(201).json(updatedTicket)
})



