import Rental from '../models/rental.js';

export const createRental = async (req, res) => {
  try {
    const { book_id, renter_id, return_date } = req.body;
    const rental = await Rental.create({ book_id, renter_id, return_date });
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRentalById = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.findById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { return_date, status } = req.body;
    const rental = await Rental.updateById(id, { return_date, status });
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRental = async (req, res) => {
  try {
    const { id } = req.params;
    const rental = await Rental.deleteById(id);
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }
    res.status(200).json({ message: 'Rental deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
