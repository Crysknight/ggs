import $ from 'jquery';
require("expose-loader?$!jquery");
import './utils/jquery.maskedinput.min.js';
import 'bootstrap';
import { device } from 'device.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.scss';

import './components/navbar';
import './components/inputs';
import './components/fast-form';
import './components/online-calculator';
import './components/monthly-payment';
import './components/application-form';
import './components/ggs-map';
import './components/thank-you-message';
import './components/loan-form';

device.addClasses(document.documentElement);