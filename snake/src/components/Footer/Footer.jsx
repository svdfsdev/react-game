import React from 'react';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="wrapper">
        <a
          className="gitHub-link"
          href="https://github.com/svdfsdev"
          target="blanck"
        >
          <i className="bi bi-github"></i>
        </a>
        <span className="year">Snake © 2021</span>

        <a className="gitHub-link" href="https://rs.school/js/" target="blanck">
          <img
            className="course-logo"
            src="https://rs.school/images/rs_school_js.svg"
            alt="course"
          />
        </a>
      </div>
    </footer>
  );
};
