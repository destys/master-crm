import { Alert, Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import TableRow from "./TableRow";
import axios from "axios";

const Attachments = ({ id, data }) => {
  const [file, setFile] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  let currentUploads = [];

  data?.attributes.order_files.data?.forEach((item) => {
    currentUploads.push(item.id);
  });

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData
      );
      currentUploads.push(res.data[0].id);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/orders/${id}?populate=order_files`,
        {
          data: {
            order_files: currentUploads,
          },
        }
      );
      setShowMessage(true);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      setShowMessage(false);
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-white mb-6">
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-5">
            <Input
              type="file"
              onChange={handleFileUpload}
              label="Загрузите 1 файл"
            />
          </div>
          <Button type="submit">Загрузить файл</Button>
        </form>
        <div className="mb-5">
          <Alert color="green" className={`${!showMessage && "hidden"} mb-2`}>
            Файл успешно загружен
          </Alert>
          <Alert color="red" className={`${!showError && "hidden"} mb-2`}>
            Ошибка при загрузке файла
          </Alert>
        </div>
        <div className="grid grid-cols-6 gap-6 mt-8">
          <div className="bg-white mb-6 col-span-6">
            <h3 className="mb-4 text-xl font-bold">
              Список загруженных файлов
            </h3>
            <div className="rounded-lg border">
              {data?.attributes.order_files.data != null ? (
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Название файла
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Размер
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Скачать файл
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.attributes.order_files.data?.map((item, index) => (
                      <TableRow
                        key={index}
                        filename={item.attributes.name}
                        size={item.attributes.size}
                        link={
                          process.env.REACT_APP_UPLOAD_URL + item.attributes.url
                        }
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <Alert color="blue" className="w-full">
                    Пока нет загруженных файлов
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attachments;
