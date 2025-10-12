import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) =>{
    e.preventDefault();
    // Logic to shorten the URL
    if(longUrl){
      navigate(`/auth?createNew=${longUrl}`); // Redirect to auth page with longUrl as query param
    }
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL shortener <br /> you'll ever need! 👇
      </h2>
      <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input type="url"
        value={longUrl}
        placeholder="Enter your loooong URL"
        onChange={(e) => setLongUrl(e.target.value)}
        className="sm:h-14 flex-1 h-full py-4 px-4"
        />
        <Button
        onClick={handleShorten}
        
        className="h-full" type="submit" variant="destructive">Shorten!</Button>
      </form>
      <img src="banner.png" alt="Banner" className="w-full my-11 md:px-12" />

      <Accordion type="multiple" collapsible className="w-full md:px-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the URLy URL Shortener works?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generate a shorter version of that URL. This shorter URL redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
          <AccordionContent>
            Yes, creating an account allows you to manage your shortened URLs, track their performance, and access additional features.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geographic location of visitors, and the referrers that led users to your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage