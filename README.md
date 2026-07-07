# Personal Website

This repository contains the source code of my personal website ([ale.desu.at](https://ale.desu.at)). It's made to be as lightweight as possible and uses pure CSS, JavaScript and jQuery.

## Features

* Dynamic page loading without refreshing the window thanks to jQuery
* State pushing to browser history
* Automatic and toggleable light/dark mode

## Notes

This project uses:

* jQuery for dynamic page loading
* [oneko.js fork](https://github.com/tylxr59/oneko.js/tree/main)

This website used to be a blog, which is used as a link collection now. The load function of jQuery loads the nested element into the parent element. In order to make these dynamic links work, an onclick attribute has to be given (onclick="redirect(this, event)"). This redirection only works on a web server.
