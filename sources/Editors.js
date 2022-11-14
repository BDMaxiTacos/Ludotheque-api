const Editor = require('../class/Editor');
const { EditorSchema } = require('../schema/EditorSchema');

async function findAll() {
  return new Promise((resolve) => {
    EditorSchema.find({}).then(async (response) => {
      const editors = [];
      for (const editor of response) {
        const editorObj = new Editor();
        await editorObj.fromJSON(editor);

        editors.push(editorObj);
      }

      resolve({
        error: false,
        editors,
      });
    });
  });
}

async function find(ObjectId = null) {
  return new Promise((resolve) => {
    EditorSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const editor = new Editor();
        await editor.fromJSON(response);
        resolve({
          error: false,
          editor,
        });
      } else {
        resolve({
          error: true,
          editor: null,
        });
      }
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    EditorSchema.deleteMany({}).then((response) => {
      resolve({
        error: false,
        result: response,
      });
    });
  });
}

module.exports = {
  findAll,
  find,
  flush,
};
