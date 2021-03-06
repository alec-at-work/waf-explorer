/* ===============================================
Use the *Params object to give "pretty" names to the parameters
Use the *ParamsOrder array to create the rendering of the parameter display
	Special usage: HEADING|* renders a heading row with the title the string after HEAADING|

 ===============================================*/

var defaultParams = {}
var defaultParamsOrder = [
	'HEADING|Unclassified'
];

var googleParams = {
	't' : 'Hit Type',
	'dt': 'Page Title',
	'dl': 'Full URL',
	'dp': 'Page path',
	'dr' : 'Referrer',
	'ul': 'User Language',
	'de': 'Page Encoding',
	'sr': 'Screen Resolution',
	'cd1' : 'Document Title (cd1)',
	'cd3': 'SEO Title (cd3)',
	'cd2': 'Page Canonical (cd2)',
	'cd4': 'User Agent (cd3)',
	'cd5' : 'External Tracking Code (cd5)',
	'cd6' : 'ADSK - OxygenID (cd6)',
	'cd7': 'Adobe Cookie ID (cd7)',
	'cid' : 'Client ID number',
	'fl' : 'FLash version',
	'je' : 'Java Enabled? (3=yes, 0=no)',
	'ni' : 'Non-interaction hit',
	'_s' : 'hit Sequence',
	'sd' : 'Screen Depth',
	'tid' : 'Account ID',
	'_v' : 'SDK Version number',
	'v' : 'protocol Version',
	'vp' : 'Browser window visible area',
	'z' : 'cache buster',
	'dh' : 'Document Host name override',
	'ua' : 'User Agent override',
	'uip' : 'User IP override',
	'cd' : 'Screen name',
	'linkid' : 'Link ID of a clicked DOM element',
	'ea' : 'Event Action',
	'ec' : 'Event Category',
	'el' : 'Event Label',
	'ev' : 'Event Value',
	'cn' : 'Campaign Name',
	'cs' : 'Campaign Source',
	'cm' : 'Campaign Medium',
	'ck' : 'Campaign Keyword',
	'cc' : 'Campaign Content',
	'ci' : 'Campaign Id',
	'glcid' : 'Google adwords ID',
	'dclid' : 'google Display ads ID',
	'sn' : 'Social Network',
	'sa' : 'Social Action',
	'st': 'Social action Targt',
	'cu' : 'Currency',
	'in' : 'Item Name',
	'ic' : 'Item Code (sku)',
	'ip' : 'Item Price (per unit)',
	'iq' : 'Item Quantity',
	'iv' : 'Item Variation (normally category)',
	'ta' : 'Transaction Affiliation',
	'ti' : 'Transaction ID',
	'tr' : 'Transaction Revenue',
	'ts' : 'Transaction Shipping',
	'tt' : 'Transaction Tax',
	'tcc' : 'Transaction Coupon Code',
	'cos' : 'Checkout Step',
	'pa' : 'Product Action',
	'pal' : 'Product Action List',
	'pr1id': 'Product 1 ID', 'pr1nm': 'Product 1 Name', 'pr1br': 'Product 1 Brand', 'pr1ca': 'Product 1 Category', 'pr1va': 'Product 1 Variant', 'pr1pr': 'Product 1 Price', 'pr1qt': 'Product 1 Quantity', 'pr1cc': 'Product 1 Coupon Code', 'pr1ps': 'Product 1 Position',
	'pr2id': 'Product 2 ID', 'pr2nm': 'Product 2 Name', 'pr2br': 'Product 2 Brand', 'pr2ca': 'Product 2 Category', 'pr2va': 'Product 2 Variant', 'pr2pr': 'Product 2 Price', 'pr2qt': 'Product 2 Quantity', 'pr2cc': 'Product 2 Coupon Code', 'pr2ps': 'Product 2 Position',
	'pr3id': 'Product 3 ID', 'pr3nm': 'Product 3 Name', 'pr3br': 'Product 3 Brand', 'pr3ca': 'Product 3 Category', 'pr3va': 'Product 3 Variant', 'pr3pr': 'Product 3 Price', 'pr3qt': 'Product 3 Quantity', 'pr3cc': 'Product 3 Coupon Code', 'pr3ps': 'Product 3 Position',
	'pr4id': 'Product 4 ID', 'pr4nm': 'Product 4 Name', 'pr4br': 'Product 4 Brand', 'pr4ca': 'Product 4 Category', 'pr4va': 'Product 4 Variant', 'pr4pr': 'Product 4 Price', 'pr4qt': 'Product 4 Quantity', 'pr4cc': 'Product 4 Coupon Code', 'pr4ps': 'Product 4 Position',
	'pr5id': 'Product 5 ID', 'pr5nm': 'Product 5 Name', 'pr5br': 'Product 5 Brand', 'pr5ca': 'Product 5 Category', 'pr5va': 'Product 5 Variant', 'pr5pr': 'Product 5 Price', 'pr5qt': 'Product 5 Quantity', 'pr5cc': 'Product 5 Coupon Code', 'pr5ps': 'Product 5 Position'
}

var googleParamsOrder = [
	'HEADING|Hit Type',
		't',
	'HEADING|Page Properties',
		'tid','dt', 'dl', 'dp', 'cc', 'dr',
	'HEADING|Events',
		'ec', 'ea', 'el','ev', 'ni',
	'HEADING|Custom dimensions',
		'cd1', 'cd3', 'cd2', 'cd6', 'cd4', 'cd5', 'cd7',
	'HEADING|Campaign information',
		'cs', 'cm', 'cn', 'ck',	'cc', 'ci', 'glcid', 'dclid',
	'HEADING|Social sharing',
		'sn', 'sa', 'st',
	'HEADING|Ecommercec - Transaction ',

	'HEADING|Other User properties',
		'ul','de','sr', 'fl','je', '_s', 'sd', 'sr',
	'HEADING|Unclassified'
];

var googleStdParams = {
'utmn' : 'utmn - Random ID to prevent gif caching',
'utmhn' : 'utmhn - Hostname',
'utmcs' : 'utmcs - Character set',
'utmsr' : 'utmsr - Screen resolution',
'utmvp' : 'utmvp - Viewport resolution',
'utmsc' : 'utmsc - Screen color depth',
'utmul' : 'utmul - Language code',
'utmje' : 'utmje - Java enabled',
'utmfl' : 'utmfl - Flash version',
'utmdt' : 'utmdt - Page title',
'utmhid' : 'utmhid - Hit ID, random number',
'utmr' : 'utmr - Full referral url',
'utmp' : 'utmp - Page path',
'utmac' : 'utmac - Account ID',
'utmcc' : 'utmcc - Analytics cookie string',
'utmvid' : 'utmvid - Visitor ID',
'utmt' : 'utmt - Request type',
'utmu' : 'utmu - Client usage',
'utmwv' : 'utmwv - Tracking code version',
'utms' : 'utms - Request made this session',
'utmtci' : 'utmtci - Billing city',
'utmtco' : 'utmtco - Billing country',
'utmtrg' : 'utmtrg - Billing region',
'utmtid' : 'utmid - Orer ID',
'utmtst' : 'utmtst - Affiliateion/store name',
'utmtsp' : 'utmtsp - Shipping cost',
'utmtto' : 'utmtto - Order total',
'utmttx' : 'utmttx - Tax cost',
'utmcn' : 'utmcn - New campaign visit',
'utmcr' : 'utmcr - Repeat campaign visit',
'guid' : 'gvid - Send globally unique identifier',
'utmip' : 'utmip - IP address',
'utme' : 'utme - Extensible parameter',
'utmni' : 'utmni - Non-interaction event',
'utmipc' : 'utmipc - Product code/sku',
'utmipn' : 'utmipn - Product name',
'utmipr' : 'utmipr - Product price',
'utmiqt' : 'utmiqt - Quantity',
'utmiva' : 'utmiva - Product category/variation',
'utmsa' : 'utmsa - Social action',
'utmsid' : 'utmsid - Social destination',
'utmsn' : 'utmsn - Social network name',
'utmcsr' : 'utmcsr - Campaign source',
'utmccn' : 'utmccn - Campaign name',
'utmcmd' : 'utmcmd - Campaign medium',
'utmctr' : 'utmctr - Campaign term/key phrase',
'utmcct' : 'utmcct - Campaign content'
}

var googleStdParamsOrder = [
	'HEADING|Hit Type',
		'utmt',
	'HEADING|Page Properties',
		'utmp','utmdt','utmhn','utmp','utmr',
	'HEADING|Events',
		'utme','utmni',
	'HEADING|Campaign information',
		'utmac','utmcc','utmcn','utmcr','utmcsr','utmccn','utmcmd','utmctr','utmcct',
	'HEADING|Social sharing',
		'utmsa','utmsid', 'utmsn',
	'HEADING|Ecommercec - Transaction ',
		'utmtci','utmtco','utmtrg','utmtid','utmtst','utmtsp','utmtto','utmttx','utmipc','utmipn','utmipr','utmiqt','utmiva',
	'HEADING|Other User properties',
		'utmvid','guid','utms','utmn','utmhid','utmwv','utmu',
	'HEADING|Unclassified',
		'utmcs','utmfl','utmip','utmje','utmsc','utmsr','tumul','utmvp'
];

var adobeParams = {
	'pageName' : 'Page Name',
	'events' : 'Events',
	'products' : 'Products',
	'v0' : 'v0 - Tracking Code',
	'v1' : 'v1 - Internal Campaign Sources',
	'v2' : 'v2 - External Campaign First Touch',
	'v3' : 'v3 - Purchase ID',
	'v4' : 'v4 - Buy Tracking',
	'v5' : 'v5 - Marketo Lead ID',
	'v6' : 'v6 - Internal Search Keywords',
	'v7' : 'v7 - Live Chat',
	'v8' : 'v8 - Trial Download Counter',
	'v9' : 'v9 - Omniture cookie ID',
	'v10' : 'v10 - Days since last visit',
	'v11' : 'v11 - Time Parting',
	'v12' : 'v12 - New/Repeat',
	'v13' : 'v13 - Visit Number',
	'v14' : 'v14 - Previous Page Name',
	'v15' : 'v15 - Search List View Ranking',
	'v16' : 'v16 - External Traffic Sources',
	'v17' : 'v17 - Foresee Responded ID',
	'v18' : 'v18 - Login Status',
	'v19' : 'v19 - AU Registration Dropdown Menu Option',
	'v20' : 'v20 - All Promo Types',
	'v21' : 'v21 - Link Tracking',
	'v22' : 'v22 - Product TV Content',
	'v23' : 'v23 - Banner Content',
	'v24' : 'v24 - Page Name',
	'v25' : 'v25 - Page Counter Visit',
	'v26' : 'v26 - Site Name',
	'v27' : 'v27 - Internal Search Counter',
	'v28' : 'v28 - Form Country',
	'v29' : 'v29 - AKQA SID',
	'v30' : 'v30 - Pages Counter Lifetime',
	'v31' : 'v31 - Offer Activity ID',
	'v32' : 'v32 - Activity ID + Page Name',
	'v33' : 'v33 - Transaction ID',
	'v34' : 'v34 - Form Error Counter',
	'v35' : 'v35 - Form Errors',
	'v36' : 'v36 - Hardware Search|System Cert|Parner Search',
	'v37' : 'v37 - Live Chat Days Before Purchase',
	'v38' : 'v38 - Demandbase 1',
	'v39' : 'v39 - Oxygen GUID',
	'v40' : 'v40 - Demandbase 2',
	'v41' : 'v41 - Lithium Message ID',
	'v42' : 'v42 - Lithium Visitor ID',
	'v43' : 'v43 - Promo Content',
	'v44' : 'v44 - Student Traffic',
	'v45' : 'v45 - Engagement',
	'v46' : 'v46 - Time to Complete',
	'v47' : 'v47 - Trial Download',
	'v48' : 'v48 - TnT Visitor ID',
	'v49' : 'v49 - Sales Status',
	'v50' : 'v50 - Purchase Type',
	'v51' : 'v51 - DCT Post Load Last State',
	'v52' : 'v52 - Video Name',
	'v53' : 'v53 - Video Segment',
	'v54' : 'v54 - Video Content Type',
	'v55' : 'v55 - Edu Serial Number & Product Key',
	'v56' : 'v56 - Edu User ID',
	'v57' : 'v57 - Campaigns Data',
	'v58' : 'v58 - DCT Page Load State',
	'v59' : 'v59 - DCT Post Load State',
	'v60' : 'v60 - eStore AB Testing',
	'v61' : 'v61 - Lithium User ID|User Rank',
	'v62' : 'v62 - All Widget Impression',
	'v63' : 'v63 - Widget Cart Value',
	'v64' : 'v64 - Message Lifespan',
	'v65' : 'v65 - Kudos',
	'v66' : 'v66 - Lithium User Rank',
	'v67' : 'v67 - Oxygen ID',
	'v68' : 'v68 - Oxygen Status',
	'v69' : 'v69 - User Role',
	'v70' : 'v70 - Catch All',
	'v71' : 'v71 - Current URL',
	'v72' : 'v72 - Referring URL',
	'v73' : 'v73 - Time Parting',
	'v74' : 'v74 - Marketo Anonymous Lead ID',
	'v75' : 'v75 - ',
	'v76' : 'v76 - User Agent',
	'v77' : 'v77 - Responsive Breakpoint',
	'v78' : 'v78 - User Navigation Method',
	'v79' : 'v79 - WAF Version',
	'v80' : 'v80 - Site Section',
  'v81' : 'v81 - Content Name',
  'v82' : 'v82 - AU Content Save',
  'v83' : 'v83 - All Events',
  'v84' : 'v84 - Page Load Timing',
  'v85' : 'v85 - ',
  'v86' : 'v86 - eStore Product Promo Code (coupon)',
  'v87' : 'v87 - eStore Cart Promo Code (coupon)',
  'v88' : 'v88 - eStore Storewide Product Promotion (no coupon)',
  'v89' : 'v89 - eStore Storewide Cart Promo Code (no coupon)',
  'v90' : 'v90 - Cart Addition Cross Sell',
  'v91' : 'v91 - eStore Product Price',
  'v99' : 'v99 - Cmpaigns eStore - Visit LT',
  'v100' : 'v100 - Campaigns > Expiration:Visit',
  'v101' : 'v101 - Campaigns - Visit FT',
  'v102' : 'v102 - Campaigns - Quarter LT',
  'v103' : 'v103 - Campaigns - Quarter FT',
  'v104' : 'v104 - Campaigns - Purchase LT',
  'v105' : 'v105 - Campaigns - Purchase FT',
  'v106' : 'v106 - Campaigns - Never LT',
  'v107' : 'v107 - WA CC - Never - FT',
  'v110' : 'v110 - WA - CC - Unedited v0',
  'v115' : 'v115 - DB Company Visitor Detail',
  'v117' : 'v117 - Marin MKWID',
  'v120' : 'v120 - IPM Parameters',
  'v130' : 'v130 - Dynamic Filter Page Load',
  'v131' : 'v131 - Dynamic Filter Change',
  'v151' : 'v151 - APP Measurement Version',
  'v152' : 'v152 - Page Domain',
  'v153' : 'v153 - Report Suite ID',
  'v200' : 'v200 - WAF Event Value',
  'v201' : 'v201 - Fingerprint 1',
	'v202' : 'v202 - Fingerprint 2',
	'v203' : 'v203 - Fingerprint 3',
	'cc': 'Currency',
	'c1' : 'c1 - All Other Sub Levels',
	'c2' : 'c2 - Page Title',
	'c3' : 'c3 - Typed/Bookmarked Pages',
	'c4' : 'c4 - Campaign Pathing',
	'c5' : 'c5 - Internal Search Results',
	'c6' : 'c6 - Internal Search Keywords',
	'c7' : 'c7 - Internal Search Page Number',
	'c8' : 'c8 - eStore External Traffic Sources',
	'c9' : 'c9 - Traffic Sources Report',
	'c10' : 'c10 - Days Since Last Visit',
	'c11' : 'c11 - Time Parting',
	'c12' : 'c12 - New/Repeat',
	'c13' : 'c13 - Visit Number',
	'c14' : 'c14 - Percentage of Page Viewed',
	'c15' : 'c15 - Partner Search ID',
	'c16' : 'c16 - ',
	'c17' : 'c17 - EDU Segment Pathing',
	'c18' : 'c18 - Lead Status',
	'c19' : 'c19 -',
	'c20' : 'c20 - Geo View',
	'c21' : 'c21 - Link Tracking',
	'c22' : 'c22 - Product TV Content',
	'c23' : 'c23 - Flash Content',
	'c24' : 'c24 - Previous Page',
	'c25' : 'c25 - Solution Viewed ID',
	'c26' : 'c26 - Form Errors',
	'c27' : 'c27 - Omniture Cookie ID',
	'c28' : 'c28 - ',
	'c29' : 'c29 - Current URL',
	'c30' : 'c30 - Referrer URL',
	'c31' : 'c31 - Product ID View',
	'c32' : 'c32 - eStore|Product ID Adds',
	'c33' : 'c33 - eStore Tracking JS File',
	'c34' : 'c34 - eStore|Country Language',
	'c35' : 'c35 - eStore|Currency',
	'c36' : 'c36 - Flash Version',
	'c37' : 'c37 - Silverlight Version',
	'c38' : 'c38 - Lithium Content Hierarchy',
	'c39' : 'c39 - Lithium Content Detail',
	'c40' : 'c40 - Site Section',
	'c41' : 'c41 - List Prop for all Widget',
	'c42' : 'c42 - EDU Visitor Segment',
	'c43' : 'c43 - Promo video/content Social Media',
	'c44' : 'c44 - Lithium Sub Section',
	'c45' : 'c45 - ',
	'c46' : 'c46 - Internal Search and WAM Product View',
	'c47' : 'c47 - Success Event Pathing',
	'c48' : 'c48 - Site Name',
	'c49' : 'c49 - Lithium Visitor ID',
	'c50' : 'c50 - Lithium Message ID',
	'c51' : 'c51 - ',
	'c52' : 'c52 - TnT Campaign ID',
	'c53' : 'c53 - TnT Campaign Name',
	'c54' : 'c54 - TnT Campaign Recipe ID',
	'c55' : 'c55 - TnT Campaign Recipe Name',
	'c56' : 'c56 - Tnt Offer ID',
	'c57' : 'c57 - TnT Offer Name',
	'c58' : 'c58 - TnT User PCID',
	'c59' : 'c59 - Live Chat Pathing',
	'c60' : 'c60 - User Rank',
	'c61' : 'c61 - User ID|User Rank',
	'c62' : 'c62 - Adobe Hit Count',
	'c63' : 'c63 - PageType',
	'c64' : 'c64 - ',
	'c65' : 'c65 - Kudos',
	'c66' : 'c66 - eStore Error',
	'c67' : 'c67 - Oxygen ID',
	'c68' : 'c68 - Oxygen Status',
	'c69' : 'c69 - User Role',
	'c70' : 'c70 - ',
	'c71' : 'c71 - Services Tracking',
	'c72' : 'c72 - Qualtrics Prop',
	'c73' : 'c73 - Time Parting',
	'c74' : 'c74 - Oxygen Login Status on Page',
	'c75' : 'c75 - PBL Cookie + Pagename'
}
var adobeParamsOrder = [
  'HEADING|Page Properties',
	    'pageName',
  'HEADING|Products',
    	'products',
  'HEADING|Campaign',
    	'v0','v1','v100',
  'HEADING|Ecommerce',
    	'cc','purchase id','state','zip',
  'HEADING|Events',
	    'events',
  'HEADING|Evars',
	    'v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12','v13','v14','v15','v16','v17','v18','v19','v20','v21','v22','v23','v24','v25','v26','v27','v28','v29','v30','v31','v32','v33','v34','v35','v36','v37','v38','v39','v40','v41','v42','v43','v44','v45','v46','v47','v48','v49','v50','v51','v52','v53','v54','v55','v56','v57','v58','v59','v60','v61','v62','v63','v64','v65','v66','v67','v68','v69','v70','v71','v72','v73','v74','v75','v76','v77','v78','v79','v80','v81','v82','v83','v84','v85','v86','v87','v88','v89','v90','v91','v92','v93','v94','v95','v96','v97','v98','v99','v107','v108','v109','v110','v111','v112','v113','v114','v115','v116','v117','v118','v119','v120','v121','v122','v123','v124','v125','v126','v127','v128','v129','v130','v131','v132','v133','v134','v135','v136','v137','v138','v139','v140','v141','v142','v143','v144','v145','v146','v147','v148','v149','v150','v151','v152','v153','v154','v155','v156','v157','v158','v159','v201','v202','v203',
  'HEADING|Props',
	    'c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13','c14','c15','c16','c17','c18','c19','c20','c21','c22','c23','c24','c25','c26','c27','c28','c29','c30','c31','c32','c33','c34','c35','c36','c37','c38','c39','c40','c41','c42','c43','c44','c45','c46','c47','c48','c49','c50','c51','c52','c53','c54','c55','c56','c57','c58','c59','c60','c61','c62','c63','c64','c65','c66','c67','c68','c69','c70','c71','c72','c73','c74','c75',
  'HEADING|Other Campaigns',
           'v101','v102','v103','v104','v105','v106',
  'HEADING|Unclassified'
];
var adobeEvents = {
  'event1' : 'Pageview (event1)',
	'event2' : 'Internal Search Keywords (event2)',
	'event3' : 'Internal Search Clicks (event3)',
	'event4' : 'KB Internal Search Keywords (event4)',
	'event5' : 'eStore Internal Traffic Sources (event5)',
	'event6' : 'eStore External Traffic Sources (event6)',
	'event7' : 'Renewals (event7)',
	'event8' : 'Beehive Internal Keywords (event8)',
	'event9' : 'Buy Tracking (event9)',
	'event10' : ' (event10)',
	'event11' : 'Time Parting (event11)',
	'event12' : 'New/Repeat (event12)',
	'event13' : 'Social Media (event13)',
	'event14' : 'Typed/Bookmarked (event14)',
	'event15' : 'Trial Intent (event15)',
	'event16' : '.ORG Internal Search Keywords (event15)',
	'event17' : 'All Widget Click Through (event17)',
	'event18' : 'All Widget Impressions (event18)',
	'event19' : 'Product Page Clicks (event19)',
	'event20' : 'Product Views (event20)',
	'event21' : 'Link Click (event21)',
	'event22' : 'Trial Initiate (event22)',
	'event23' : 'OLD Download Start (event23)',
	'event24' : 'OLD Download Complete (event24)',
	'event25' : 'OLD Marketing Form Submit (event25)',
	'event26' : 'OLD Form Submit (event26)',
	'event27' : 'Form Error (event27)',
	'event28' : 'Forms Submit Success  (event28)',
	'event29' : 'Form Submit Click (event29)',
	'event30' : 'Student Traffic (event30)',
	'event31' : 'Serial Form Submit Click (event31)',
	'event32' : 'EDU Cloud Trial (event32)',
	'event33' : 'Product View (event33)',
	'event34' : 'eStore Coupon Product Discuont (event34)',
	'event35' : 'eStore Coupon Order Discount (event35)',
	'event36' : 'Edu Product View (event36)',
	'event37' : 'Edu Download Start (event37)',
	'event38' : 'Paid Media Cost (event38)',
	'event39' : 'Paid Media Impressions (event39)',
	'event40' : 'Visit Start (event40)',
	'event41' : 'eStore Cart Addition Quantity (event41)',
	'event42' : 'eStore Cart Detail Value (event42)',
	'event43' : 'Cart Removal Quantity (event43)',
	'event44' : 'Cart Removal Amount (event44)',
	'event45' : 'Renewals Revenue (event45)',
	'event46' : 'Live Chat Cart Value (event46)',
	'event47' : 'YouTube NumClicks (event47)',
	'event48' : 'YouTube Num Impressions (event48)',
	'event49' : 'SSO Register View (event49)',
	'event50' : 'Foresee Form Submit (event50)',
	'event51' : ' (event51)',
	'event52' : ' (event52)',
	'event53' : 'Lithium Sum of Rating (event53)',
	'event54' : 'Lithium Read Message (event54)',
	'event55' : 'Lithium Create Message (event55)',
	'event56' : 'Lithium Edit Message (event56)',
	'event57' : 'Lithium Reply to Message (event57)',
	'event58' : 'Lithium Board Searches (event58)',
	'event59' : 'Lithium Registration Created (event59)',
	'event60' : 'Lithium Sum Lifespan (event60)',
	'event61' : 'Lithium Page View (event61)',
	'event62' : 'All Promo Type Impressions (event62)',
	'event63' : 'All Promo Type Clicks (event63)',
	'event64' : 'DPC (event64)',
	'event65' : ' (event65)',
	'event66' : 'Configurator Promos (event66)',
	'event67' : 'Forum Posts (event67)',
	'event68' : 'Widget Cart Click (event68)',
	'event69' : 'Oxygen View (event69)',
	'event70' : 'Oxygen Successful Login (event70)',
	'event71' : 'Oxygen Create Account View (event71)',
	'event72' : 'Oxygen Create Account Successfully (event72)',
	'event73' : 'Social Share (event73)',
	'event74' : 'Proactive Chat Prompts (event74)',
	'event75' : 'Lithium SSO Log In View (event75)',
	'event76' : 'Lithium SSO Log In Successfully (event76)',
	'event77' : 'Lithium Accepted Solution Viewed (event77)',
	'event78' : 'Viewer File Upload (event78)',
	'event79' : 'Email Submission (event79)',
	'event80' : 'Edu Registration Step 1 (event80)',
	'event81' : 'Edu Registration Step 2 (event81)',
	'event82' : 'Edu Registration Step 3 (event82)',
	'event83' : 'Edu Registration Activation (event83)',
	'event84' : 'Cloud Trial Initiate (event84)',
	'event85' : ' (event85)',
	'event86' : 'Configurator Reseller Click Through (event86)',
	'event87' : 'VAT Exemptions (event87)',
	'event88' : ' (event88)',
	'event89' : ' (event89)',
	'event90' : 'Video View (event90)',
	'event91' : 'Video Completed (event91)',
	'event92' : 'Video Time Played (event92)',
	'event93' : 'Video Milestones 25 (event93)',
	'event94' : 'Video Milestones 50 (event94)',
	'event95' : 'Video Milestones 75 (event95)',
	'event96' : 'Video Segment (event96)',
	'event97' : 'Mentions (event97)',
	'event98' : 'Total Sentiment (event98)',
	'event99' : ' (event99)',
  'event101' : 'Content Save (event101)',
  'event102' : 'Content Unsave (event102)',
  'event110' : 'Account Information (event110)',
  'event111' : 'Billing Information (event111)',
  'event112' : 'Billing and Payament (event112)',
  'event113' : 'Add to Cart Click (event113)',
  'event114' : 'Empty Cart (event114)',
  'event115' : 'Gross Revenue (event115)',
  'event120' : 'Try Component Availability (event120)',
  'event121' : 'Buy Component Availability (event121)',
  'event130' : 'Dynamic Filtering on Page Load (event130)',
  'event131' : 'Dynamic Filtering Change (event131)',
  'event150' : 'Content Served (event150)',
  'event151' : 'Content Viewed (event151)',
  'event152' : 'Content Clicked (event152)',
  'event153' : '(event153)'

}
var marketoParams = {
	'_mchNc' : '_mchNc', //	1435712408290
	'_mchHr' : '_mchHr', 	// http://www.autodesk.com/content/dam/autodesk/www/products/autodesk-autocad/images/misc/autocad-overview-video-1152x648.flv
	'_mchId' : '_mchId', 	//918-FOD-433
	'_mchTk' : '_mchTk', //	_mch-autodesk.com-1434491959403-56977
	'_mchCn' : '_mchCn',
	'_mchHo' : '_mchHo', //	www.autodesk.com
	'_mchPo' : '_mchPo',
	'_mchRu' : '_mchRu', 	///products/autocad/free-trial
	'_mchPc' : '_mchPc', 	//http:
	'_mchVr' : '_mchVr',
	'munchkinId' : 'munchkinId',
	'_mkt_trk' : '_mkt_trk',
	'formid' : 'formid',
	'lpId' : 'lpId',
	'formVid' : 'formVid',
	'activityId' : 'activityId',
	'activityName' : 'activityName',
	'programId' : 'programId',
	'programName' : 'programName',
	'communicationChannel' : 'communicationChannel',
	'Partner_Account__c' : 'Partner_Account__c',
	'mktvar001' : 'mktvar001',
	'mktvar002' : 'mktvar002',
	'mktvar004' : 'mktvar004',
	'referrerUrl' : 'referrerUrl',
	'currentProductInterest' : 'currentProductInterest',
	'countryISOCode' : 'countryISOCode',
	'Email' : 'Email'

}
var marketoParamsOrder = [
	'HEADING|Hit track',
	'_mchHr',
	'HEADING|Unclassified'
];
var tntParams = {
	'mboxHost' : 'mboxHost',
	'mboxSession' : 'mboxSession',
	'mboxPC' : 'mboxPC',
	'mboxPage' : 'mboxPage',
	'screenHeight' : 'screenHeight',
	'screenWidth' : 'screenWidth',
	'browserWidth' : 'browserWidth',
	'browserHeight' : 'browserHeight',
	'browserTimeOffset' : 'browserTimeOffset',
	'colorDepth' : 'colorDepth',
	'mboxCount' : 'mboxCount',
	'mbox' : 'mbox',
	'mboxId' : 'mboxId',
	'mboxTime' : 'mboxTime',
	'mboxURL' : 'mboxURL',
	'mboxReferrer' : 'mboxReferrer',
	'mboxVersion' : 'mboxVersion'
}
var tntParamsOrder = [
	'HEADING|Mbox information',
	'mbox', 'mboxId',
	'HEADING|Unclassified'
];
