// controllers/bookController.js
import Profile from '../models/profile.js';

export const addProfile = async (req, res) => {
  const { firstname, lastname} = req.body;
  const userId = req.user.id;
  const profilePhoto = req.file ? req.file.path : null;
  
  try {

    const profile = await Profile.create({
      firstname,
      lastname,
      userId,
      profilePhoto,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile= await Profile.findByUser(userId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const profileId = req.params.id;
  const updates = req.body;
  const profilePhoto = req.file ? req.file.path : null;

  if (profilePhoto) {
    updates.profilePhoto = profilePhoto;
  }

  try {
    const profile = await Profile.updateById(profileId, updates);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const profileId = req.params.id;

  try {
    const profile = await Profile.deleteById(profileId);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
