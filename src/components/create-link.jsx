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
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import QRCode from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "db/apiUrls";
import { BeatLoader } from "react-spinners";

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

    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues, user_id: user?.id });

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data, navigate]);

    const createNewLink = async () => {
        setErrors({});
        try {
            await schema.validate(formValues, { abortEarly: false });
            if (ref.current && ref.current.canvasRef.current) {
                const canvas = ref.current.canvasRef.current;
                const blob = await new Promise((resolve) => canvas.toBlob(resolve));
                await fnCreateUrl(blob);
            } else {
                await fnCreateUrl();
            }
        } catch (e) {
            const newErrors = {};
            if (e.inner) {
                e.inner.forEach((err) => {
                    newErrors[err.path] = err.message;
                });
            } else {
                newErrors.general = e.message;
                
            }
            setErrors(newErrors);
        }
    }
    

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
                {errors.title && <Error message={errors.title} />}

                <Input
                    id="longUrl"
                    placeholder="Enter Your Loooong URL"
                    value={formValues.longUrl}
                    onChange={handleChange}
                />
                {errors.longUrl && <Error message={errors.longUrl} />}

                <div className="flex items-center gap-2">
                    <Card className={"p-2"}>URLy.in</Card> /
                    <Input
                        id="customUrl"
                        placeholder="Custom Link (Optinal)"
                        value={formValues.customUrl}
                        onChange={handleChange}
                    />
                </div>

                {error && <Error message={error.message} />}
                {/* {console.log(error)} */}
                <DialogFooter className="sm:justify-start">
                    <DialogClose>
                        <Button
                            disabled={loading}
                            onClick={createNewLink}
                            className={"cursor-pointer"}
                            variant="destructive">
                            {loading ? <BeatLoader size={10} color="white" /> : "Create Link"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLink;