import express from "express";
import mongoose from "mongoose";

import Ticket from "../models/tickets.js";

import moment from "moment";
export const addTicket = async (req, res) => {
  const {id,ticket_des,fname,name,creator} = req.body;
 
  const newTicket = new Ticket({
    id :id,
    ticket_des: ticket_des,
    fname:fname,
    creator: creator,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    name: name,
    Date: moment().toISOString(),
   
  });

  try {
    await newTicket.save();

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const  getTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find().sort({Date:-1});
    

    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  const ticket = req.body;
  const { id } = req.params;
  console.log(req.body)
  console.log(id)
  const { ticket_des, fname,name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No ticket with id: ${id}`);

  const updatedTicket = {
    ...ticket,
    fname,
    name,
    ticket_des,
    updatedAt: moment().toISOString(),
    _id: id,
  };

  await Ticket.findByIdAndUpdate(id, updatedTicket, { new: true });

  res.json(updatedTicket);
};

export const deleteTicket = async (req, res) => {
  const ticket = req.body;

  const { _id } = req.body;

  const { name, ticket_desc,  creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No ticket with id: ${_id}`);

  const deletedTicket = {
    ...ticket,
    Resolved: true,
    creator,
    name,
    ticket_desc,
    DeletedAt: moment().toISOString(),
    _id: _id,
  };

  await Ticket.findByIdAndUpdate(_id, deletedTicket, { new: true });

  res.json(deletedTicket);
};
export const getTicketsByName = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Ticket.find({
      $or: [{ empname: new RegExp(".*" + searchQuery + ".*") }],
    }).sort({ Date: -1 });

    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
