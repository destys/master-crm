import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

const SendMessage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Fragment>
        <Button onClick={handleOpen} variant="gradient">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </Button>
        <Dialog open={open} size={'sm'} handler={handleOpen}>
          <DialogHeader>Отправить сообщение клиенту.</DialogHeader>
          <DialogBody divider>
            <form className="mt-8 mb-2 w-full max-w-screen-lg">
              <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Телефон" />
                <Textarea size="lg" label="Сообщение" />
              </div>
              <Button className="mt-6" fullWidth>
                Отправить
              </Button>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Отменить</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Готово</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default SendMessage;
