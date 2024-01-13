// ScrollSpy.jsx
import React, { useEffect } from 'react';

const ScrollSpy = ({ onSectionChange }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('div[id]');

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 90;
        const sectionBottom = sectionTop + section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          onSectionChange(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onSectionChange]);

  return null;
};

export default ScrollSpy;
