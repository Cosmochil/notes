class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(req, h) {
    try {
      const { title = "untitled", body, tags } = req.payload;
      const noteId = this._service.addNote({ title, body, tags });

      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (e) {
      const response = h.response({
        status: "fail",
        message: e.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const note = this._service.getNoteById(id);
      return {
        status: "success",
        data: { note },
      };
    } catch (e) {
      const response = h.response({
        status: "failed",
        message: e.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(req, h) {
    try {
      const { id } = req.params;
      this._service.editNoteById(id, req.payload);
      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (e) {
      const response = h.response({
        status: "fail",
        message: e.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(req, h) {
    try {
        const { id } = req.params;
      this._service.deleteNoteById(id);
      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    } catch (e) {
      const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
