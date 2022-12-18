import React from 'react'
import {Link as LinkScroll} from 'react-scroll'
import { AiOutlineArrowUp } from "react-icons/ai";

function BackToTopButton() {
    return (
        <div>
            <LinkScroll
        className="rounded-full bg-alt_bg shadow-xl text-center text-text right-3 bottom-3 fixed border border-gray-300/80 flex"
        activeClass="active"
        to="search"
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
      >
        <span className="w-full m-auto rounded-full p-4 text-2xl sm:hover:cursor-pointer">
          {" "}
          <AiOutlineArrowUp />{" "}
        </span>
      </LinkScroll>
            
        </div>
    )
}

export default BackToTopButton
