import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@/components/ui";
import { useToast } from "@/hooks/use-toast";

const roomInputsSchema = z.object({
  roomName: z.string().min(6, "Name must minimum 6 characters"),
  password: z.string().min(6, "Password must minimum 6 characters"),
});
type RoomInputType = z.infer<typeof roomInputsSchema>;

const ChooseRoomPage = () => {
  const { toast } = useToast();
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch: _,
    formState: { errors },
  } = useForm<RoomInputType>({
    resolver: zodResolver(roomInputsSchema),
  });

  const onSubmit: SubmitHandler<RoomInputType> = (data) => console.log(data);
  const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (errors.password) {
      toast({
        title: errors.password.message,
      });
    }
    if (errors.roomName) {
      toast({
        title: errors.roomName.message,
      });
    }
  }, [errors.password, errors.roomName, toast]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create a room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Room Detail</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={() => handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Room name
              </Label>
              <Input
                {...register("roomName")}
                value={roomName}
                onChange={handleRoomNameChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                {...register("password")}
                type={"password"}
                value={password}
                onChange={handlePasswordChange}
                className="col-span-3"
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ChooseRoomPage;
