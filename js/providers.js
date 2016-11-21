/* ===============================================
Sets up providers
providerUrl is matched on hit request to identify the provider
providerParams - points to the object containign the parameters and their "pretty names"
providerParamsOrder - points to the array used to render the request
providerName - displays on the right column to identify the hit
providerClass - used to define the css class
providerType - used for hiding or showing the hit based on checkboxes in header
 ===============================================*/

var providers = [
		
	{
		'providerId' : 'adobeOld',
		'providerUrl' : 'metrics.autodesk.com/b/ss/autodesk-new-gl/1/H',
		'providerParams' : adobeParams,
		'providerParamsOrder' : adobeParamsOrder,
		'providerName' : 'Adobe - Old Version',
		'providerClass' : 'adobe',
		'providerType' : 'analytics'
	},
	{
		'providerId' : 'adobe',
		'providerUrl' : 'metrics.autodesk.com',
		'providerParams' : adobeParams,
		'providerParamsOrder' : adobeParamsOrder,
		'providerName' : 'Adobe',
		'providerClass' : 'adobe',
		'providerType' : 'analytics'
	},	
	{
		'providerId' : 'tnt',
		'providerUrl' : 'autodesk.tt.omtrdc.net/m2/autodesk/',
		'providerParams' : tntParams,
		'providerParamsOrder' : tntParamsOrder,
		'providerName' : 'Adobe Target',
		'providerClass' : 'tnt',
		'providerType' : 'testing'
		
	},
	{
		'providerId' : 'googleUniversal',
		'providerUrl' : 'www.google-analytics.com/collect',
		'providerParams' : googleParams,
		'providerParamsOrder' : googleParamsOrder,
		'providerName' : 'Google Analytics - Universal',
		'providerClass' : 'googleUniversal',
		'providerType' : 'analytics'

	},	
	{
		'providerId' : 'googleStandard',
		'providerUrl' : 'www.google-analytics.com/__utm',
		'providerParams' : googleStdParams,
		'providerParamsOrder' : googleStdParamsOrder,
		'providerName' : 'Google Analytics - Standard',
		'providerClass' : 'googleStandard',
		'providerType' : 'analytics'

	},
	{
		'providerId' : 'marketo',
		'providerUrl' : 'assets.autodesk.com/index.php/leadCapture/',
		'providerParams' : marketoParams,
		'providerParamsOrder' : marketoParamsOrder,
		'providerName' : 'Marketo Lead Capture',
		'providerClass' : 'marketo',
		'providerType' : 'lead'	

	},
	{
		'providerId' : 'marketo',
		'providerUrl' : 'mktoresp.com/webevents/',
		'providerParams' : defaultParams,
		'providerParamsOrder' : defaultParamsOrder,
		'providerName' : 'Marketo Tracking',
		'providerClass' : 'marketo',
		'providerType' : 'analytics'	

	},
	{
		'providerId' : 'doubleclickFloodlight',
		'providerUrl' : 'fls.doubleclick.net',
		'providerParams' : defaultParams,
		'providerParamsOrder' : defaultParamsOrder,
		'providerName' : 'Doubleclick Floodlight',
		'providerClass' : 'doubleclick',
		'providerType' : 'remarketing'

	},
	{
		'providerId' : 'doubleclick',
		'providerUrl' : 'doubleclick.net',
		'providerParams' : defaultParams,
		'providerParamsOrder' : defaultParamsOrder,
		'providerName' : 'Doubleclick',
		'providerClass' : 'doubleclick',
		'providerType' : 'remarketing'

	}
	,
	{
		'providerId' : 'demandbase',
		'providerUrl' : 'demandbase.com',
		'providerParams' : defaultParams,
		'providerParamsOrder' : defaultParamsOrder,
		'providerName' : 'Demandbase',
		'providerClass' : 'demandbase',
		'providerType' : 'enrichment'

	}
]