import React from "react";
import { animateScroll } from "react-scroll";

// se uso  el setTimeout porque no hay un scroll enmidiato.
// Esta solución la propuso un usuario en el curso de sockets. En la clase que se habla de react-scroll.
// En la ultima sección
export const scrollToBottomWithoutAnimate = (id) => {
  setTimeout(() => {
    animateScroll.scrollToBottom({
      containerId: id,
      duration: 0,
    });
  }, 10);
};

export const scrollToBottomWithAnimate = (id) => {
  setTimeout(() => {
    animateScroll.scrollToBottom({
      containerId: id,
      duration: 200,
      // delay: 0,
      // smooth: true,
      // isDynamic: true,
      // offset: -50,
    });
  }, 10);
};
