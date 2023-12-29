import classNames from 'classnames/bind';
import style from './icon.module.scss';
const cx = classNames.bind(style);

export const NotificationIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M6.485 17.669a2 2 0 002.829 0l-2.829-2.83a2 2 0 000 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 00.64-6.356 1.01 1.01 0 10-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 00-2.788-.84 5.036 5.036 0 00-3.57 1.478z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const HelpIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fillRule="evenodd">
            <circle fill="currentColor" cx={12} cy={12} r={10} />
            <circle fill="inherit" cx={12} cy={18} r={1} />
            <path
               d="M15.89 9.05a3.975 3.975 0 00-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 00.982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 014.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 00-1 .987v2.014a1.001 1.001 0 002.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0015.89 9.05"
               fill="inherit"
            />
         </g>
      </svg>
   );
};
export const SettingIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M11.701 16.7a5.002 5.002 0 110-10.003 5.002 5.002 0 010 10.004m8.368-3.117a1.995 1.995 0 01-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 00.315-.574 8.947 8.947 0 00-.836-1.993.477.477 0 00-.598-.195 2.04 2.04 0 01-1.29.08 1.988 1.988 0 01-1.404-1.395 2.04 2.04 0 01.076-1.297.478.478 0 00-.196-.597 8.98 8.98 0 00-1.975-.826.479.479 0 00-.574.314 1.995 1.995 0 01-1.885 1.346 1.994 1.994 0 01-1.884-1.345.482.482 0 00-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 00-.198.582A2.002 2.002 0 014.445 7.06a.478.478 0 00-.595.196 8.946 8.946 0 00-.833 1.994.48.48 0 00.308.572 1.995 1.995 0 011.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 00-.308.57 8.99 8.99 0 00.723 1.79.477.477 0 00.624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 00.168.628 8.946 8.946 0 002.11.897.474.474 0 00.57-.313 1.995 1.995 0 011.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 00.57.313 8.964 8.964 0 002.084-.883.473.473 0 00.167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 00.628-.19 8.925 8.925 0 00.728-1.793.478.478 0 00-.314-.573"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const AddPeople = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <rect x={18} y={5} width={2} height={6} rx={1} />
            <rect x={16} y={7} width={6} height={2} rx={1} />
            <path d="M5 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z" />
            <circle cx={11} cy={7} r={4} />
         </g>
      </svg>
   );
};
export const DownIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const ImportIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <path d="M11.208 9.32L9.29 11.253a1 1 0 000 1.409.982.982 0 001.397 0l1.29-1.301 1.336 1.347a.982.982 0 001.397.001 1.002 1.002 0 00.001-1.408l-1.965-1.98a1.08 1.08 0 00-1.538-.001z" />
            <path d="M11 10.007l.001 9.986c0 .557.448 1.008 1 1.007.553 0 1-.45 1-1.007L13 10.006C13 9.451 12.552 9 12 9s-1.001.451-1 1.007z" />
            <path d="M7.938 5.481a4.8 4.8 0 00-.777-.063C4.356 5.419 2 7.62 2 10.499 2 13.408 4.385 16 7.1 16h2.881v-1.993H7.1c-1.657 0-3.115-1.663-3.115-3.508 0-1.778 1.469-3.087 3.104-3.087h.012c.389 0 .686.051.97.15l.17.063c.605.248.875-.246.875-.246l.15-.267c.73-1.347 2.201-2.096 3.716-2.119a4.14 4.14 0 014.069 3.644l.046.34s.071.525.665.525c.013 0 .012.005.023.005h.254c1.136 0 1.976.959 1.976 2.158 0 1.207-.987 2.342-2.07 2.342h-3.964V16h3.964C20.105 16 22 13.955 22 11.665c0-1.999-1.312-3.663-3.138-4.074-.707-2.707-3.053-4.552-5.886-4.591-1.975.021-3.901.901-5.038 2.481z" />
         </g>
      </svg>
   );
};
export const GraphIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor">
            <path d="M21 17H4.995C4.448 17 4 16.548 4 15.991V6a1 1 0 10-2 0v9.991A3.004 3.004 0 004.995 19H21a1 1 0 000-2zm-3-8v3a1 1 0 002 0V8a1 1 0 00-1-1h-4a1 1 0 000 2h3z" />
            <path d="M13.293 13.707a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L14 11.586l-2.293-2.293a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414L11 11.414l2.293 2.293z" />
         </g>
      </svg>
   );
};
export const CustomIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <path d="M3 7h3v2H3zm0 8h11v2H3zm7-8h11v2H10zm8 8h3v2h-3z" />
            <path d="M11 8a3 3 0 11-5.999.001A3 3 0 0111 8zM9 8a1 1 0 10-1.999-.001A1 1 0 009 8zm10 8a3 3 0 11-5.999.001A3 3 0 0119 16zm-2 0a1 1 0 10-1.999-.001A1 1 0 0017 16z" />
         </g>
      </svg>
   );
};
export const SearchIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const FullScreenIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M16.587 6.003H15A1 1 0 0115 4h3.9l.047.001a.975.975 0 01.736.285l.032.032c.2.2.296.47.284.736l.001.048v3.896a1 1 0 11-2 0V7.411l-3.309 3.308a.977.977 0 01-1.374-.005l-.032-.032a.976.976 0 01-.005-1.374l3.307-3.305zM7.413 17.997H9A1 1 0 019 20H5.1l-.047-.001a.975.975 0 01-.736-.285l-.032-.032A.977.977 0 014 18.946a1.12 1.12 0 010-.048v-3.896a1 1 0 112 0v1.587l3.309-3.308a.977.977 0 011.374.005l.032.032a.976.976 0 01.005 1.374l-3.307 3.305z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const MenuIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <circle cx={5} cy={12} r={2} />
            <circle cx={12} cy={12} r={2} />
            <circle cx={19} cy={12} r={2} />
         </g>
      </svg>
   );
};
export const TreeIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <path d="M11 7h2v5h-2zm5 6h2v3h-2zM6 13h2v3H6z" />
            <path d="M7 11h10a1 1 0 011 1v1H6v-1a1 1 0 011-1z" />
            <path
               d="M5 18v1h4v-1H5zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2zm10 2v1h4v-1h-4zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1a2 2 0 012-2zM10 5v1h4V5h-4zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2V5a2 2 0 012-2z"
               fillRule="nonzero"
            />
         </g>
      </svg>
   );
};
export const AddIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const BlackLogIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor">
            <path d="M5 19.002C5 19 17 19 17 19v-2.002C17 17 5 17 5 17v2.002zm-2-2.004C3 15.894 3.895 15 4.994 15h12.012c1.101 0 1.994.898 1.994 1.998v2.004A1.997 1.997 0 0117.006 21H4.994A1.998 1.998 0 013 19.002v-2.004z" />
            <path d="M5 15h12v-2H5v2zm-2-4h16v6H3v-6z" />
            <path d="M7 11.002C7 11 19 11 19 11V8.998C19 9 7 9 7 9v2.002zM5 8.998C5 7.894 5.895 7 6.994 7h12.012C20.107 7 21 7.898 21 8.998v2.004A1.997 1.997 0 0119.006 13H6.994A1.998 1.998 0 015 11.002V8.998z" />
            <path d="M5 5v2h12V5H5zm-2-.002C3 3.894 3.895 3 4.994 3h12.012C18.107 3 19 3.898 19 4.998V9H3V4.998z" />
         </g>
      </svg>
   );
};
export const BoardIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor">
            <path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0120.01 20H3.99A1.994 1.994 0 012 18.006V5.994z" />
            <path d="M8 6v12h2V6zm6 0v12h2V6z" />
         </g>
      </svg>
   );
};

export const EyeIconPassword = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <path d="M11.983 15.984a4.005 4.005 0 01-4.002-4c0-2.206 1.795-4 4.002-4a4.005 4.005 0 014.002 4c0 2.206-1.795 4-4.002 4M12 4C6.48 4 2 8.84 2 12c0 3.086 4.577 8 10 8s10-4.914 10-8c0-3.16-4.481-8-10-8" />
            <circle cx={12} cy={12} r={2} />
         </g>
      </svg>
   );
};

export const EyeIconText = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor" fillRule="evenodd">
            <path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8" />
            <path d="M11.977 13.984c-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2s-.896 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.207 0 4-1.794 4-4s-1.793-4-4-4" />
         </g>
      </svg>
   );
};

export const LogoIcon = ({ nameCss }) => {
   return (
      <svg
         className={nameCss}
         viewBox="0 0 190 32"
         height={32}
         xmlns="http://www.w3.org/2000/svg"
         focusable="false"
         aria-hidden="true"
      >
         <defs>
            <linearGradient x1="99.684716%" y1="15.8138128%" x2="39.8444399%" y2="97.4388388%" id="uid5">
               <stop stopColor="#0052CC" offset="0%" />
               <stop stopColor="#2684FF" offset="100%" />
            </linearGradient>
         </defs>
         <g stroke="none" strokeWidth={1} fill="#0052CC">
            <path
               fill="url(#uid5)"
               d="M6.90502605,15.6123193 C6.76436383,15.4302139 6.53773035,15.3340846 6.30742588,15.35884 C6.0771214,15.3835955 5.876643,15.525635 5.7787929,15.7333781 L0.0719979599,27.0218487 C-0.0337056449,27.2310259 -0.0224063827,27.4794358 0.101860917,27.6783741 C0.226128216,27.8773125 0.445645594,27.9984148 0.68202605,27.9984369 L8.62844459,27.9984369 C8.88847261,28.0044096 9.12761649,27.8581627 9.23847268,27.6253781 C10.9526159,24.1210252 9.91378448,18.7926722 6.90502605,15.6123193 Z"
            />
            <path
               fill="#2684FF"
               d="M11.0859556,5.33713587 C8.19309829,9.74089822 7.85921851,15.3267488 10.2073011,20.0371359 L14.0383488,27.6176065 C14.1538739,27.8462194 14.3900332,27.9906411 14.6483769,27.9906653 L22.5933685,27.9906653 C22.829749,27.9906431 23.0492663,27.8695408 23.1735336,27.6706025 C23.2978009,27.4716641 23.3091002,27.2232543 23.2033966,27.014077 C23.2033966,27.014077 12.5147056,5.8619594 12.2460792,5.33290058 C12.1377032,5.11315026 11.9118188,4.97410225 11.6646746,4.97500451 C11.4175304,4.97590676 11.1926893,5.11660025 11.0859556,5.33713587 L11.0859556,5.33713587 Z"
            />
            <path
               d="M104.2774,14.3919316 C104.2774,17.1872257 105.588069,19.4065198 110.714802,20.3862846 C113.773504,21.0215787 114.414212,21.5100493 114.414212,22.5187551 C114.414212,23.4985198 113.772077,24.1327551 111.617715,24.1327551 C109.013896,24.0864379 106.462135,23.403307 104.189999,22.1442846 L104.189999,26.6972257 C105.733976,27.4465198 107.772754,28.2822846 111.559566,28.2822846 C116.919251,28.2822846 119.045788,25.9175787 119.045788,22.4033434 M119.045788,22.4033434 C119.045788,19.0892257 117.268858,17.5327551 112.25878,16.4668728 C109.491535,15.8615787 108.821574,15.2566375 108.821574,14.3919316 C108.821574,13.297814 109.811889,12.835814 111.646968,12.835814 C113.860906,12.835814 116.045591,13.4986375 118.113622,14.4208728 L118.113622,10.0691081 C116.130615,9.17615406 113.970906,8.73311319 111.792518,8.7724022 C106.840589,8.7724022 104.2774,10.9048728 104.2774,14.3919316"
               fill="inherit"
            />
            <polygon
               fill="inherit"
               points="173.129997 9.07000017 173.129997 28.0038825 177.20791 28.0038825 177.20791 13.5657649 178.926691 17.3983531 184.694132 28.0038825 189.820865 28.0038825 189.820865 9.07000017 185.742952 9.07000017 185.742952 21.2891766 184.198975 17.7442355 179.567399 9.07000017"
            />
            <rect fill="inherit" x="142.740005" y="9.07000017" width="4.45677247" height="18.9338824" />
            <path
               d="M137.600792,22.4033434 C137.600792,19.0892257 135.823862,17.5327551 130.813784,16.4668728 C128.046539,15.8615787 127.376579,15.2566375 127.376579,14.3919316 C127.376579,13.297814 128.366893,12.835814 130.201972,12.835814 C132.41591,12.835814 134.600595,13.4986375 136.668626,14.4208728 L136.668626,10.0691081 C134.685619,9.17615406 132.52591,8.73311319 130.347522,8.7724022 C125.395593,8.7724022 122.832404,10.9048728 122.832404,14.3919316 C122.832404,17.1872257 124.143073,19.4065198 129.269806,20.3862846 C132.328508,21.0215787 132.969216,21.5100493 132.969216,22.5187551 C132.969216,23.4985198 132.327081,24.1327551 130.172719,24.1327551 C127.568901,24.0864379 125.017139,23.403307 122.745003,22.1442846 L122.745003,26.6972257 C124.28898,27.4465198 126.327758,28.2822846 130.11457,28.2822846 C135.474256,28.2822846 137.600792,25.9175787 137.600792,22.4033434"
               fill="inherit"
            />
            <polygon
               fill="inherit"
               points="69.6599979 9.07000017 69.6599979 28.0038825 78.8204081 28.0038825 80.2627142 23.9115296 74.1456665 23.9115296 74.1456665 9.07000017"
            />
            <polygon
               fill="inherit"
               points="51.5549984 9.07000017 51.5549984 13.1620002 56.5069282 13.1620002 56.5069282 28.0038825 60.9925967 28.0038825 60.9925967 13.1620002 66.2941332 13.1620002 66.2941332 9.07000017"
            />
            <path
               d="M45.0573091,9.07000017 L39.1785647,9.07000017 L32.5050001,28.0038825 L37.6014102,28.0038825 L38.5474889,24.815059 C40.877531,25.4919503 43.3551322,25.4919503 45.6851743,24.815059 L46.6312529,28.0038825 L51.7287333,28.0038825 L45.0573091,9.07000017 Z M42.1177585,21.4007061 C41.287584,21.4006584 40.4616854,21.2831148 39.6651602,21.0516472 L42.1177585,12.7889413 L44.5703569,21.0544708 C43.7736914,21.2849831 42.9477956,21.4015755 42.1177585,21.4007061 L42.1177585,21.4007061 Z"
               fill="inherit"
            />
            <path
               d="M94.6019534,9.07000017 L88.7235658,9.07000017 L82.0500011,28.0038825 L87.1474815,28.0038825 L88.0935601,24.815059 C90.4236023,25.4919503 92.9012034,25.4919503 95.2312455,24.815059 L96.1773242,28.0038825 L101.274805,28.0038825 L94.6019534,9.07000017 Z M91.6627596,21.4007061 C90.8325851,21.4006584 90.0066865,21.2831148 89.2101613,21.0516472 L91.6627596,12.7889413 L94.1153579,21.0544708 C93.3186924,21.2849831 92.4927966,21.4015755 91.6627596,21.4007061 L91.6627596,21.4007061 Z"
               fill="inherit"
            />
            <path
               d="M163.256954,9.07000017 L157.378566,9.07000017 L150.705002,28.0038825 L155.802482,28.0038825 L156.748561,24.815059 C159.078603,25.4919503 161.556204,25.4919503 163.886246,24.815059 L164.832325,28.0038825 L169.930162,28.0038825 L163.256954,9.07000017 Z M160.315977,21.4007061 C159.485802,21.4006584 158.659903,21.2831148 157.863378,21.0516472 L160.315977,12.7889413 L162.768575,21.0544708 C161.971909,21.2849831 161.146014,21.4015755 160.315977,21.4007061 L160.315977,21.4007061 Z"
               fill="inherit"
            />
         </g>
      </svg>
   );
};

export const JiraIcon = () => {
   return (
      <svg viewBox="0 0 69 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
         <defs>
            <linearGradient x1="98.0308675%" y1="0.160599572%" x2="58.8877062%" y2="40.7655246%" id="uid1">
               <stop stopColor="#0052CC" offset="18%" />
               <stop stopColor="#2684FF" offset="100%" />
            </linearGradient>
         </defs>
         <g stroke="none" strokeWidth={1} fillRule="nonzero">
            <path
               fill="#2684FF"
               d="M22.9366667,4 L11.41,4 C11.41,5.3800098 11.9582068,6.703498 12.934021,7.67931228 C13.9098353,8.65512657 15.2333235,9.20333333 16.6133333,9.20333333 L18.7366667,9.20333333 L18.7366667,11.2533333 C18.7385054,14.1244521 21.0655479,16.4514946 23.9366667,16.4533333 L23.9366667,5 C23.9366667,4.44771525 23.4889514,4 22.9366667,4 Z"
            />
            <path
               fill="url(#uid1)"
               d="M17.2333333,9.74333333 L5.70666667,9.74333333 C5.70850536,12.6144521 8.03554792,14.9414946 10.9066667,14.9433333 L13.03,14.9433333 L13.03,17 C13.0336786,19.8711178 15.3622132,22.196669 18.2333333,22.1966667 L18.2333333,10.7433333 C18.2333333,10.1910486 17.7856181,9.74333333 17.2333333,9.74333333 Z"
            />
            <path
               fill="url(#uid1)"
               d="M11.5266667,15.4833333 L0,15.4833333 C3.51929402e-16,18.357055 2.32961169,20.6866667 5.20333333,20.6866667 L7.33333333,20.6866667 L7.33333333,22.7366667 C7.33516565,25.6051863 9.65815176,27.9311544 12.5266667,27.9366667 L12.5266667,16.4833333 C12.5266667,15.9310486 12.0789514,15.4833333 11.5266667,15.4833333 Z"
            />
            <path
               fill="var(--ds-text, #172B4D)"
               d="M37.07,18.956 C37.07,20.646 36.394,21.842 34.418,21.842 C33.56,21.842 32.702,21.686 32,21.4 L32,23.662 C32.65,23.896 33.586,24.104 34.808,24.104 C38.032,24.104 39.41,21.946 39.41,18.8 L39.41,6.918 L37.07,6.918 L37.07,18.956 Z M42.894,7.568 C42.894,8.556 43.544,9.128 44.454,9.128 C45.364,9.128 46.014,8.556 46.014,7.568 C46.014,6.58 45.364,6.008 44.454,6.008 C43.544,6.008 42.894,6.58 42.894,7.568 Z M43.31,24 L45.546,24 L45.546,11 L43.31,11 L43.31,24 Z M48.926,24 L51.11,24 L51.11,16.33 C51.11,13.574 52.852,12.716 55.712,13.002 L55.712,10.818 C53.164,10.662 51.864,11.754 51.11,13.288 L51.11,11 L48.926,11 L48.926,24 Z M66.45,24 L66.45,21.66 C65.618,23.376 64.058,24.26 62.056,24.26 C58.598,24.26 56.856,21.322 56.856,17.5 C56.856,13.834 58.676,10.74 62.316,10.74 C64.214,10.74 65.67,11.598 66.45,13.288 L66.45,11 L68.686,11 L68.686,24 L66.45,24 Z M59.092,17.5 C59.092,20.62 60.34,22.18 62.654,22.18 C64.656,22.18 66.45,20.906 66.45,18.02 L66.45,16.98 C66.45,14.094 64.812,12.82 62.914,12.82 C60.392,12.82 59.092,14.484 59.092,17.5 Z"
               fillRule="evenodd"
            />
         </g>
      </svg>
   );
};

export const GreenTickIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <g fillRule="evenodd">
            <circle fill="currentColor" cx={12} cy={12} r={10} />
            <path
               d="M9.707 11.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 12.586l-1.293-1.293z"
               fill="inherit"
            />
         </g>
      </svg>
   );
};
export const BagIcon = ({ nameCss }) => {
   return (
      <svg width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            fill="currentColor"
            fillRule="evenodd"
            d="M17 14h2V9H5v5h2v-1a1 1 0 012 0v1h6v-1a1 1 0 012 0v1zm0 2v1a1 1 0 01-2 0v-1H9v1a1 1 0 01-2 0v-1H5v3h14v-3h-2zM9 7h6V6H9v1zM7 7V5a1 1 0 011-1h8a1 1 0 011 1v2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2z"
         />
      </svg>
   );
};
export const SuccessIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M6.735 12.322a1 1 0 00-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 003.939-3.883l.04-.04a492.598 492.598 0 003.658-3.643 1 1 0 00-1.424-1.404 518.42 518.42 0 01-3.64 3.625l-.04.04a2049.114 2049.114 0 01-3.775 3.722l-3.098-3.363z"
            fill="currentColor"
         />
      </svg>
   );
};
export const CloseIcon = ({ nameCss }) => {
   return (
      <svg className={nameCss} width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M12 10.586L6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 001.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293a1 1 0 10-1.414-1.414L12 10.586z"
            fill="currentColor"
         />
      </svg>
   );
};
export const UserIcon = ({ nameCss }) => {
   return (
      <img
         src="https://secure.gravatar.com/avatar/96bd7f66bb5903b12b40d3696a36bd7a?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-5.png"
         alt=""
         className={cx('user-img')}
         style={{ borderRadius: '50%' }}
      />
   );
};
export const Buiding = ({ nameCss }) => {
   return (
      <svg className={nameCss}>
         <g fill="currentColor" fillRule="evenodd">
            <path
               d="M8 6H5.009C3.902 6 3 6.962 3 8.15v10.7C3 20.04 3.9 21 5.009 21h5.487H8v-2.145c-1.616-.001-3-.003-3-.004 0 0 .005-10.708.009-10.708L8 8.144V6z"
               fillRule="nonzero"
            />
            <path d="M12 7h2v2h-2zm-6 3h2v2H6zm0 3h2v2H6zm6-3h2v2h-2zm0 3h2v2h-2zm2 3h2v3h-2zm2-9h2v2h-2zm0 3h2v2h-2zm0 3h2v2h-2z" />
            <path
               d="M18.991 19C18.998 19 19 4.995 19 4.995c0 .006-7.991.005-7.991.005C11.002 5 11 19 11 19h7.991zM9 4.995C9 3.893 9.902 3 11.009 3h7.982C20.101 3 21 3.893 21 4.995v14.01A2.004 2.004 0 0118.991 21H9V4.995z"
               fillRule="nonzero"
            />
         </g>
      </svg>
   );
};
export const Location = ({ nameCss }) => {
   return (
      <svg className={nameCss}>
         <path
            d="M12 21c-2.28 0-6-8.686-6-12a6 6 0 1112 0c0 3.314-3.72 12-6 12zm0-9a2.912 2.912 0 100-5.824A2.912 2.912 0 0012 12z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const Email = ({ nameCss }) => {
   return (
      <svg className={nameCss}>
         <g fill="currentColor" fillRule="evenodd">
            <path
               d="M5 7v10h14V7H5zm14-2c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h14z"
               fillRule="nonzero"
            ></path>
            <path d="M5.498 6.5H3.124c.149.44.399.854.75 1.205l5.882 5.881a3.117 3.117 0 004.41 0l5.882-5.881c.35-.351.6-.765.749-1.205h-2.373l-5.672 5.672a1.119 1.119 0 01-1.583 0L5.498 6.5z"></path>
         </g>
      </svg>
   );
};
export const Phone = ({ nameCss }) => {
   return (
      <svg className={nameCss} height="16" width="16" viewBox="0 0 512 512">
         <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
      </svg>
   );
};
export const LoadingIcon = ({ nameCss }) => {
   return (
      <span className={cx('wrapper')}>
         <span className={cx('loading')}>
            <svg
               height={24}
               width={24}
               viewBox="0 0 16 16"
               xmlns="http://www.w3.org/2000/svg"
               className={cx('icon-loading', nameCss)}
               style={{ animationDelay: '0ms' }}
            >
               <circle cx={8} cy={8} r={7} style={{ stroke: 'var(--ds-icon-subtle, #fff)' }} />
            </svg>
         </span>
      </span>
   );
};
export const ShuttleIcon = ({ nameCss }) => {
   return (
      <svg
         className={nameCss}
         viewBox="0 0 32 32"
         height={32}
         xmlns="http://www.w3.org/2000/svg"
         focusable="false"
         aria-hidden="true"
      >
         <defs>
            <linearGradient x1="108.695%" x2="12.439%" y1="-14.936%" y2="45.215%" id="uid2-1">
               <stop stopColor="#0052CC" offset="0%" />
               <stop stopColor="#2684FF" offset="100%" />
            </linearGradient>
            <linearGradient x1="0%" x2="91.029%" y1="118.55%" y2="63.971%" id="uid2-2">
               <stop stopColor="#0052CC" offset="0%" />
               <stop stopColor="#2684FF" offset="100%" />
            </linearGradient>
         </defs>
         <g stroke="none" strokeWidth={1} fillRule="nonzero">
            <path
               fill="#2684FF"
               d="M15.9669691 29.3616152C17.2195568 28.1097726 17.9233158 26.4114623 17.9233158 24.6405626 17.9233158 22.8696629 17.2195568 21.1713527 15.9669691 19.91951L7.26805808 11.2489111 3.31143376 15.2055354C2.89743442 15.6200502 2.89743442 16.291565 3.31143376 16.7060799L15.9669691 29.3616152zM28.6225045 15.2055354L15.9669691 2.55 15.9280399 2.58892922C13.3485687 5.19994003 13.3612164 9.40374108 15.9563521 11.9991833L24.6623412 20.6662432 28.6225045 16.7060799C29.0365039 16.291565 29.0365039 15.6200502 28.6225045 15.2055354z"
            />
            <path
               fill="url(#uid2-1"
               d="M15.9669691,11.9921053 C13.3718335,9.39666304 13.3591857,5.19286199 15.938657,2.58185118 L6.91061706,11.6063521 L11.6316697,16.3274047 L15.9669691,11.9921053 Z"
            />
            <path
               fill="url(#uid2-2"
               d="M20.2951906,15.5912886 L15.9669691,19.91951 C17.2195568,21.1713527 17.9233158,22.8696629 17.9233158,24.6405626 C17.9233158,26.4114623 17.2195568,28.1097726 15.9669691,29.3616152 L25.0162432,20.3123412 L20.2951906,15.5912886 Z"
            />
         </g>
      </svg>
   );
};
export const ManagerIcon = () => {
   return (
      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
         <g fill="currentColor">
            <path d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 002 0V4a1 1 0 00-1-1h-4a1 1 0 000 2h3z"></path>
            <path d="M12.707 12.707l8-8a1 1 0 10-1.414-1.414l-8 8a1 1 0 001.414 1.414z"></path>
         </g>
      </svg>
   );
};
export const StarIcon = () => {
   return (
      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
         <path
            d="M12.072 17.284l-3.905 2.053a1 1 0 01-1.451-1.054l.745-4.349-3.159-3.08a1 1 0 01.554-1.705l4.366-.635 1.953-3.956a1 1 0 011.794 0l1.952 3.956 4.366.635a1 1 0 01.555 1.705l-3.16 3.08.746 4.349a1 1 0 01-1.45 1.054l-3.906-2.053z"
            fill="currentColor"
            fillRule="evenodd"
         ></path>
      </svg>
   );
};
export const FilterIcon = () => {
   return (
      <svg width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            d="M11 6v9.586l-3.793-3.793a.999.999 0 00-1.414 0c-.39.39-.39 1.024 0 1.415l5.5 5.499A.993.993 0 0012 19a.993.993 0 00.707-.293l5.5-5.499a1 1 0 10-1.414-1.415L13 15.586V6a1 1 0 00-2 0z"
            fill="currentColor"
            fillRule="evenodd"
         />
      </svg>
   );
};
export const LeftIcon = () => {
   return (
      <svg width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9.005 10.995l4.593-4.593a.99.99 0 111.4 1.4l-3.9 3.9 3.9 3.9a.99.99 0 01-1.4 1.4L9.005 12.41a1 1 0 010-1.414z"
         />
      </svg>
   );
};
export const RightIcon = () => {
   return (
      <svg width={24} height={24} viewBox="0 0 24 24" role="presentation">
         <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14.995 10.995a1 1 0 010 1.414l-4.593 4.593a.99.99 0 01-1.4-1.4l3.9-3.9-3.9-3.9a.99.99 0 011.4-1.4l4.593 4.593z"
         />
      </svg>
   );
};
export const imgProject = [
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10410?size=medium',
   'https://tcx19.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10422&avatarType=project',
   'https://tcx19.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10415&avatarType=project',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10403?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10421?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10402?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10404?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10401?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10408?size=medium',
   'https://tcx19.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10424&avatarType=project',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10400?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10405?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10412?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10425?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10407?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10413?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=medium',
   'https://dathhcc2.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10409?size=medium',
];
