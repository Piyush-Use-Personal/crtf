import fs from "fs";
const splitter = "CONTENT:";
const secondarySplitter = "VARIABLE:";

function Validator(data) {
  if (data.includes(splitter) && data.includes(secondarySplitter)) {
    return true;
  }
  return false;
}

class FileHandler {
  constructor(filepath, encoding) {
    this.filepath = filepath;
    this.encoding = encoding ?? "útf-8";
  }

  getContent() {
    let url = this.filepath;
    let encoding = this.encoding;
    return new Promise(function (resolve, reject) {
      fs.readFile(url, encoding, function (err, data) {
        if (err) reject(err);
        else {
          if (Validator(data)) {
            resolve(data);
          } else {
            reject("ERROR: File Format Not Valid!");
          }
        }
      });
    });
  }

  seperateVariableAndContent(data) {
    let variable, content;
    let splitContent = data.split(splitter);
    variable = splitContent[0].trim();
    variable = variable.split(secondarySplitter)[1].trim();
    content = splitContent[1].trim();
    return {
      variable: variable,
      content: content,
    };
  }

  writeContent(url, data) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(url, data, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export default class CRTF {
  constructor(variable, content, fh) {
    this.variable = variable;
    this.content = content;
    this.fh = fh;
  }

  /**
   * @param {path of the .crtf file} filepath
   * @param {encoding of the file. By default it will be utf-8} encoding
   * @returns CRTF class object
   */
  static async build(filepath, encoding) {
    try {
      let fh = new FileHandler(filepath, encoding ?? "utf-8");
      let completeContent = await fh.getContent();
      let json = fh.seperateVariableAndContent(completeContent);
      return new CRTF(json.variable, json.content, fh);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns Raw content of the .crtf file
   */
  getContent() {
    return this.content;
  }
  /**
   * @returns Raw variables of the .crtf file
   */
  getVariables() {
    return this.variable;
  }

  /**
   * @param {An Object of item which are define in the .crtf file with there values} replacer
   * @returns String of replaced data
   */
  replaceContent(replacer) {
    let sentObj = this.content;
    Object.keys(replacer).forEach((element) => {
      let rep = "<" + element + ">";
      sentObj = sentObj.replace(new RegExp(rep, "g"), replacer[element]);
    });
    return sentObj;
  }

  /**
   * @param {url of the file where data needs to be written} url
   * @param {An object of item which are define in the .crtf file with there values} replacer
   */
  async replaceContentAndWrite(url, replacer) {
    try {
      let replacedData = this.replaceContent(replacer);
      await this.fh.writeContent(url, replacedData);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
