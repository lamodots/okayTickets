import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import Ticket from "../models/ticketModel.js"
import Note from "../models/noteModel.js"



// @desc    Get ticket notes
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
export const getNotes = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)

  if(!user){
    res.status(401) 
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if(!ticket){
    res.status(404)
    throw new Error("Ticket Not found")
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Not Authorized")
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes)
}) 


// @desc    Create a  note
// @route   POST  /api/tickets/:ticketId/notes
// @access  Private
export const addNotes = asyncHandler(async (req, res) => {
  const {id} = req.user
  const user = await User.findById(id)
  const {text} = req.body

  if(!user){
    res.status(401) 
    throw new Error("User not found")
  }

  if(!text){
    res.status(400)
    throw new Error("Please enter a text for the note")
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if(!ticket){
    res.status(404)
    throw new Error("Ticket Not found")
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Not Authorized")
  }
  const note = await Note.create({
    text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  })
  
  res.status(201).json(note)
})