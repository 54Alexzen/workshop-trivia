import { Request, Response } from 'express';
import { getPlaylistsFromFirebase } from '../services/playlist-service';

export const getPlaylists = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.uid) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const playlist = await getPlaylistsFromFirebase();

    res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching playlist',
    });
  }
};
