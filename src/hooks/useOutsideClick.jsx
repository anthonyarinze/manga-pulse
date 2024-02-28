import { useEffect, useRef } from "react";

export function useOutsideClick(handler, modalRef, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, modalRef, listenCapturing]);

  return ref;
}
