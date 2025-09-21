## Media Workspace Backend : 
    A Node.js + Express + MongoDB (GridFS) backend that allows users to:
        1) Sign up and log in securely (JWT).
        2) Upload images/videos to their personal workspace.
        3) View all files or a single file
        4) Delete files
    Tech Stack : 
        * NodeJs, Express, Mongoose, JWT, brcyptjs, 
        * Multer : file uploading handling
        * MongoDB (GridFS) : storage large files by splitting into chuncks, supports steaming.
    APIs : 
      Auth APIs : 
            Register User : POST /api/auth/register
            Login User : POST /api/auth/login
      File APIs : 
            Upload File : POST /api/files/upload
            Get All Files : GET /api/files
            Get One File : GET /api/files/:id
            Delete File : DELETE /api/files/:id
            
      
