import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useRef, useState } from "react";
import * as yup from "yup";
import QRCode from "react-qrcode-logo";

const CreateLink = () => {

    const { user } = UrlState();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const ref = useRef();

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup.string().url("Invalid URL").required("Long URL is required"),
        customUrl: yup.string().optional(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }}
        >
            <DialogTrigger>
                <Button className={"cursor-pointer"} variant={"destructive"}>Create New Link</Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-md"}>
                <DialogHeader>
                    <DialogTitle className={"font-bold text-2xl"}>Create New</DialogTitle>
                </DialogHeader>

                {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref} />}

                <Input
                    id="title"
                    placeholder="Short Link's Title"
                    value={formValues.title}
                    onChange={handleChange}
                />
                <Error message={"Some Error"} />
                <Input
                    id="longUrl"
                    placeholder="Enter Your Loooong URL"
                    value={formValues.longUrl}
                    onChange={handleChange}
                />
                <Error message={"Some Error"} />
                <div className="flex items-center gap-2">
                    <Card className={"p-2"}>URLy.in</Card> /
                    <Input
                        id="customUrl"
                        placeholder="Custom Link (Optinal)"
                        value={formValues.customUrl}
                        onChange={handleChange}
                    />
                </div>
                <Error message={"Some Error"} />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button className={"cursor-pointer"} variant="destructive">
                            Create
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLink;