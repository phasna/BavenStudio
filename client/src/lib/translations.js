export const translations = {
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.shop': { fr: 'Shop', en: 'Shop' },
  'nav.cart': { fr: 'Panier', en: 'Cart' },
  'nav.searchPlaceholder': { fr: 'Rechercher...', en: 'Search...' },
  'nav.openSearch': { fr: 'Ouvrir la recherche', en: 'Open search' },
  'nav.closeSearch': { fr: 'Fermer la recherche', en: 'Close search' },
  'nav.openMenu': { fr: 'Ouvrir le menu', en: 'Open menu' },
  'nav.closeMenu': { fr: 'Fermer le menu', en: 'Close menu' },
  'nav.collection': { fr: 'Collection', en: 'Collection' },
  'nav.login': { fr: 'Connexion', en: 'Log in' },

  'gender.women': { fr: 'Femme', en: 'Women' },
  'gender.men': { fr: 'Homme', en: 'Men' },
  'gender.all': { fr: 'Tout', en: 'All' },

  'shop.resultsFor': { fr: (q) => `Résultats pour « ${q} »`, en: (q) => `Results for "${q}"` },
  'shop.clear': { fr: 'effacer', en: 'clear' },
  'shop.noProducts': {
    fr: 'Aucun produit ne correspond à cette sélection pour le moment.',
    en: 'No products match this selection right now.',
  },

  'cart.title': { fr: 'Panier', en: 'Cart' },
  'cart.empty': { fr: 'Votre panier est vide', en: 'Your cart is empty' },
  'cart.backToShop': { fr: 'Retour au shop', en: 'Back to shop' },
  'cart.remove': { fr: 'Retirer', en: 'Remove' },
  'cart.total': { fr: (v) => `Total : ${v} €`, en: (v) => `Total: €${v}` },
  'cart.checkout': { fr: 'Commander', en: 'Checkout' },

  'checkout.title': { fr: 'Paiement', en: 'Payment' },
  'checkout.shippingSection': { fr: 'Livraison', en: 'Shipping' },
  'checkout.paymentSection': { fr: 'Paiement', en: 'Payment' },
  'checkout.fullName': { fr: 'Nom complet', en: 'Full name' },
  'checkout.email': { fr: 'Email', en: 'Email' },
  'checkout.phone': { fr: 'Téléphone', en: 'Phone' },
  'checkout.address': { fr: 'Adresse', en: 'Address' },
  'checkout.city': { fr: 'Ville', en: 'City' },
  'checkout.postalCode': { fr: 'Code postal', en: 'Postal code' },
  'checkout.country': { fr: 'Pays', en: 'Country' },
  'checkout.cardName': { fr: 'Nom sur la carte', en: 'Name on card' },
  'checkout.cardNumber': { fr: 'Numéro de carte', en: 'Card number' },
  'checkout.expiry': { fr: 'Expiration', en: 'Expiry' },
  'checkout.expiryPlaceholder': { fr: 'MM/AA', en: 'MM/YY' },
  'checkout.cvc': { fr: 'CVC', en: 'CVC' },
  'checkout.simulationNote': {
    fr: "Simulation — aucune donnée bancaire n'est transmise (V1).",
    en: 'Simulation — no card data is transmitted (V1).',
  },
  'checkout.summary': { fr: 'Récapitulatif', en: 'Summary' },
  'checkout.subtotal': { fr: 'Sous-total', en: 'Subtotal' },
  'checkout.shippingLine': { fr: 'Livraison', en: 'Shipping' },
  'checkout.totalLine': { fr: 'Total', en: 'Total' },
  'checkout.processing': { fr: 'Traitement...', en: 'Processing...' },
  'checkout.pay': { fr: (v) => `Payer ${v} €`, en: (v) => `Pay €${v}` },
  'checkout.backToCart': { fr: 'Retour au panier', en: 'Back to cart' },
  'checkout.continueToPayment': { fr: 'Continuer vers le paiement', en: 'Continue to payment' },
  'checkout.backToShipping': { fr: 'Retour', en: 'Back' },
  'checkout.thankYou': {
    fr: (name) => `Merci pour votre commande, ${name}`,
    en: (name) => `Thank you for your order, ${name}`,
  },
  'checkout.confirmationSent': {
    fr: (email) => `Une confirmation a été envoyée (simulation) à ${email}.`,
    en: (email) => `A confirmation has been sent (simulation) to ${email}.`,
  },
  'checkout.simulatedPayment': {
    fr: "Paiement simulé — aucune transaction réelle n'a été effectuée (V1).",
    en: 'Simulated payment — no real transaction was made (V1).',
  },

  'checkout.errors.fullName': { fr: 'Nom requis', en: 'Name required' },
  'checkout.errors.email': { fr: 'Email invalide', en: 'Invalid email' },
  'checkout.errors.phone': { fr: 'Téléphone requis', en: 'Phone required' },
  'checkout.errors.address': { fr: 'Adresse requise', en: 'Address required' },
  'checkout.errors.city': { fr: 'Ville requise', en: 'City required' },
  'checkout.errors.postalCode': { fr: 'Code postal invalide', en: 'Invalid postal code' },
  'checkout.errors.cardName': { fr: 'Nom sur la carte requis', en: 'Name on card required' },
  'checkout.errors.cardNumber': { fr: 'Numéro de carte invalide', en: 'Invalid card number' },
  'checkout.errors.cardExpiryFormat': { fr: 'Format MM/AA', en: 'Format MM/YY' },
  'checkout.errors.cardExpiryMonth': { fr: 'Mois invalide', en: 'Invalid month' },
  'checkout.errors.cardExpired': { fr: 'Carte expirée', en: 'Card expired' },
  'checkout.errors.cardCvc': { fr: 'CVC invalide', en: 'Invalid CVC' },

  'product.loading': { fr: 'Chargement…', en: 'Loading…' },
  'product.detailsTitle': { fr: 'Détails & matière', en: 'Details & material' },
  'product.careInstructions': {
    fr: 'Entretien : lavage à 30°C, ne pas blanchir, séchage à plat conseillé.',
    en: 'Care: machine wash at 30°C, do not bleach, flat drying recommended.',
  },
  'product.shippingReturnsTitle': { fr: 'Livraison & retours', en: 'Shipping & returns' },
  'product.deliveryEstimate': {
    fr: 'Livraison estimée en 3 à 5 jours ouvrés en France métropolitaine.',
    en: 'Estimated delivery in 3–5 business days within mainland France.',
  },
  'product.freeReturns': {
    fr: 'Retours gratuits sous 30 jours, article non porté et étiquette conservée.',
    en: 'Free returns within 30 days, unworn item with tag attached.',
  },
  'product.sizeGuideTitle': { fr: 'Guide des tailles', en: 'Size guide' },
  'product.size': { fr: 'Taille', en: 'Size' },
  'product.chest': { fr: 'Tour de poitrine (cm)', en: 'Chest (cm)' },
  'product.length': { fr: 'Longueur (cm)', en: 'Length (cm)' },
  'product.color': { fr: 'Couleur', en: 'Color' },
  'product.quantity': { fr: 'Quantité', en: 'Quantity' },
  'product.decreaseQty': { fr: 'Diminuer la quantité', en: 'Decrease quantity' },
  'product.increaseQty': { fr: 'Augmenter la quantité', en: 'Increase quantity' },
  'product.addToCart': { fr: 'Ajouter au panier', en: 'Add to cart' },
  'product.viewCart': { fr: 'Voir le panier', en: 'View cart' },
  'product.relatedTitle': { fr: 'Vous aimerez aussi', en: 'You may also like' },

  'notfound.message': { fr: "Cette page n'existe pas.", en: "This page doesn't exist." },
  'notfound.backHome': { fr: "Retour à l'accueil", en: 'Back to home' },

  'cookies.title': { fr: 'Cookies', en: 'Cookies' },
  'cookies.messageIntro': {
    fr: "Pour vous offrir une meilleure expérience, ce site utilise des cookies internes et tiers. En sélectionnant « Tout accepter », vous consentez à leur utilisation. Pour en savoir plus ou choisir vos préférences, cliquez sur « Gérer les préférences » ou consultez notre",
    en: 'To offer you a better experience, this site uses 1st and 3rd party cookies and similar technologies. By selecting "Accept all" you consent to the use of all of them. For more information or to select your preferences click on "Manage preferences" or read our',
  },
  'cookies.messageJoin': { fr: 'et notre', en: 'and' },
  'cookies.privacyPolicy': { fr: 'politique de confidentialité', en: 'Privacy Policy' },
  'cookies.cookiePolicy': { fr: 'politique de cookies', en: 'Cookie Policy' },
  'cookies.continueWithoutAccepting': { fr: 'Continuer sans accepter', en: 'Continue without accepting' },
  'cookies.accept': { fr: 'Tout accepter', en: 'Accept all' },
  'cookies.decline': { fr: 'Tout refuser', en: 'Decline all' },
  'cookies.customize': { fr: 'Gérer les préférences', en: 'Manage preferences' },
  'cookies.hideDetails': { fr: 'Masquer les préférences', en: 'Hide preferences' },
  'cookies.save': { fr: 'Enregistrer mes choix', en: 'Save my choices' },
  'cookies.necessary.title': { fr: 'Nécessaires', en: 'Necessary' },
  'cookies.necessary.desc': {
    fr: 'Indispensables au fonctionnement du site (panier, connexion, sécurité). Toujours actifs.',
    en: 'Required for the site to function (cart, login, security). Always active.',
  },
  'cookies.analytics.title': { fr: 'Analytiques', en: 'Analytics' },
  'cookies.analytics.desc': {
    fr: "Nous aident à comprendre comment vous utilisez le site pour l'améliorer.",
    en: 'Help us understand how you use the site so we can improve it.',
  },
  'cookies.marketing.title': { fr: 'Marketing', en: 'Marketing' },
  'cookies.marketing.desc': {
    fr: "Utilisés pour vous proposer des publicités et contenus pertinents.",
    en: 'Used to show you relevant ads and content.',
  },
  'cookies.alwaysOn': { fr: 'Toujours actif', en: 'Always on' },
  'cookies.policyLink': { fr: 'Politique de cookies', en: 'Cookie policy' },

  'footer.back': { fr: "Retour à l'accueil", en: 'Back to home' },

  'footer.info.sections': {
    fr: [
      {
        heading: 'Notre histoire',
        body: "Baven Studio est un label créé autour d'une idée simple : Become. Evolve. Depuis nos débuts, nous concevons des vêtements pensés comme des pièces de fond de dressing plutôt que comme des tendances éphémères — des silhouettes qui traversent les saisons et évoluent avec celles et ceux qui les portent.",
      },
      {
        heading: 'Notre approche',
        body: "Chaque pièce est développée en petites séries, avec une attention particulière portée aux matières (coton lourd, molleton brossé, toiles techniques) et aux finitions. Nous privilégions des fournisseurs capables de justifier l'origine de leurs matières premières et limitons volontairement le nombre de références par collection.",
      },
      {
        heading: 'Become. Evolve.',
        body: "Notre signature résume notre philosophie : le vêtement comme point de départ, jamais comme point d'arrivée. Nous concevons des bases solides — coupes, matières, détails — que chacun peut s'approprier et faire évoluer dans le temps.",
      },
    ],
    en: [
      {
        heading: 'Our story',
        body: 'Baven Studio is a label built around one idea: Become. Evolve. From day one, we have designed clothes meant as wardrobe staples rather than fleeting trends — silhouettes that carry through seasons and evolve with the people who wear them.',
      },
      {
        heading: 'Our approach',
        body: 'Each piece is developed in small batches, with close attention paid to materials (heavyweight cotton, brushed fleece, technical canvases) and finishing. We favor suppliers who can account for the origin of their raw materials and deliberately keep our range of references limited per collection.',
      },
      {
        heading: 'Become. Evolve.',
        body: 'Our signature sums up our philosophy: clothing as a starting point, never an endpoint. We design solid foundations — cuts, materials, details — that everyone can make their own and evolve over time.',
      },
    ],
  },

  'footer.stockists.sections': {
    fr: [
      {
        heading: 'Boutique en ligne',
        body: 'Baven Studio est actuellement disponible exclusivement sur bavenstudio.com, avec une livraison en France métropolitaine et, prochainement, en Europe.',
      },
      {
        heading: 'Points de vente partenaires',
        body: "Nous ne travaillons pas encore avec de revendeurs physiques. La liste de nos points de vente partenaires sera publiée sur cette page dès l'ouverture de nos premiers corners.",
      },
      {
        heading: 'Devenir revendeur',
        body: 'Boutiques et concept stores intéressés par une collaboration peuvent nous contacter via la page Support en précisant leur activité, leur localisation et leur clientèle habituelle.',
      },
    ],
    en: [
      {
        heading: 'Online store',
        body: 'Baven Studio is currently available exclusively at bavenstudio.com, with shipping across mainland France and, soon, Europe.',
      },
      {
        heading: 'Partner stores',
        body: "We don't yet work with physical retailers. A list of our stockist partners will be published on this page as soon as our first corners open.",
      },
      {
        heading: 'Become a stockist',
        body: 'Stores and concept stores interested in a collaboration can reach us via the Support page, sharing their business, location and usual clientele.',
      },
    ],
  },

  'footer.social.sections': {
    fr: [
      {
        heading: 'Instagram',
        body: '@bavenstudio — nouveautés, coulisses de fabrication et lookbooks en avant-première.',
      },
      {
        heading: 'TikTok',
        body: '@bavenstudio — essayages, styling et contenu behind-the-scenes.',
      },
      {
        heading: 'Pinterest',
        body: 'Baven Studio — moodboards et références qui inspirent nos collections.',
      },
      {
        heading: 'Newsletter',
        body: 'Inscrivez-vous depuis le bas de notre page Accueil pour être informé·e en priorité des nouvelles sorties et des ventes privées.',
      },
    ],
    en: [
      {
        heading: 'Instagram',
        body: '@bavenstudio — new drops, behind-the-scenes production and early lookbooks.',
      },
      {
        heading: 'TikTok',
        body: '@bavenstudio — try-ons, styling and behind-the-scenes content.',
      },
      {
        heading: 'Pinterest',
        body: 'Baven Studio — moodboards and references that inspire our collections.',
      },
      {
        heading: 'Newsletter',
        body: 'Sign up from the bottom of our Home page to be the first to hear about new drops and private sales.',
      },
    ],
  },

  'footer.support.sections': {
    fr: [
      {
        heading: 'Livraison',
        body: 'Livraison estimée en 3 à 5 jours ouvrés en France métropolitaine (6 € forfaitaires, offerte dès 150 € d\'achat). Un numéro de suivi est envoyé par email dès l\'expédition de votre commande.',
      },
      {
        heading: 'Retours & échanges',
        body: "Retours gratuits sous 30 jours à compter de la réception, article non porté, non lavé et étiquette d'origine conservée. Le remboursement est effectué sur le moyen de paiement utilisé lors de la commande, sous 14 jours après réception du retour.",
      },
      {
        heading: 'Guide des tailles',
        body: "Un guide des tailles détaillé (tour de poitrine, longueur) est disponible sur chaque fiche produit, dans la section « Guide des tailles ». En cas de doute entre deux tailles, nous recommandons de prendre la taille au-dessus pour nos coupes oversize.",
      },
      {
        heading: 'Paiement',
        body: 'Paiement sécurisé par carte bancaire (Visa, Mastercard, American Express). Aucune donnée bancaire n\'est stockée sur nos serveurs.',
      },
      {
        heading: 'Nous contacter',
        body: 'Pour toute question relative à une commande, une taille ou un retour, notre équipe vous répond sous 48h ouvrées à support@bavenstudio.com.',
      },
    ],
    en: [
      {
        heading: 'Shipping',
        body: "Estimated delivery in 3-5 business days within mainland France (flat rate €6, free from €150 of purchase). A tracking number is emailed as soon as your order ships.",
      },
      {
        heading: 'Returns & exchanges',
        body: 'Free returns within 30 days of receipt, unworn, unwashed item with original tag attached. Refunds are issued to the original payment method within 14 days of us receiving the return.',
      },
      {
        heading: 'Size guide',
        body: 'A detailed size guide (chest, length) is available on every product page, under "Size guide". If you\'re between two sizes, we recommend sizing up for our oversized cuts.',
      },
      {
        heading: 'Payment',
        body: 'Secure payment by credit card (Visa, Mastercard, American Express). No card data is stored on our servers.',
      },
      {
        heading: 'Contact us',
        body: 'For any question about an order, sizing or a return, our team replies within 48 business hours at support@bavenstudio.com.',
      },
    ],
  },

  'footer.legal.sections': {
    fr: [
      {
        heading: 'Éditeur du site',
        body: 'Baven Studio SAS, société par actions simplifiée au capital de [montant] euros, immatriculée au Registre du Commerce et des Sociétés sous le numéro SIRET [à compléter], dont le siège social est situé [adresse à compléter]. Directeur de la publication : [nom à compléter]. Contact : legal@bavenstudio.com.',
      },
      {
        heading: 'Hébergement',
        body: "Ce site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur].",
      },
      {
        heading: 'Propriété intellectuelle',
        body: "L'ensemble des contenus présents sur ce site (textes, images, logos, mises en page) sont la propriété exclusive de Baven Studio ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable est interdite.",
      },
      {
        heading: 'Données personnelles',
        body: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles, ainsi que d'un droit d'opposition et de limitation du traitement. Ces droits peuvent être exercés à l'adresse privacy@bavenstudio.com.",
      },
      {
        heading: 'Cookies',
        body: 'Ce site utilise des cookies nécessaires au fonctionnement du panier et, sous réserve de votre consentement, des cookies analytiques et marketing. Vous pouvez modifier vos préférences à tout moment depuis le bandeau cookies affiché en bas de page.',
      },
      {
        heading: 'Droit applicable et litiges',
        body: 'Les présentes mentions légales sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut d\'accord, les tribunaux français seront seuls compétents.',
      },
    ],
    en: [
      {
        heading: 'Site publisher',
        body: 'Baven Studio SAS, a simplified joint-stock company with capital of [amount] euros, registered with the Trade and Companies Register under SIRET number [to be completed], with registered office at [address to be completed]. Publication director: [name to be completed]. Contact: legal@bavenstudio.com.',
      },
      {
        heading: 'Hosting',
        body: 'This site is hosted by [host name], [host address].',
      },
      {
        heading: 'Intellectual property',
        body: 'All content on this site (text, images, logos, layout) is the exclusive property of Baven Studio or its partners, unless stated otherwise. Any reproduction, representation or use, in whole or in part, without prior authorization is prohibited.',
      },
      {
        heading: 'Personal data',
        body: 'In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase and port your personal data, as well as the right to object and to restrict processing. These rights can be exercised at privacy@bavenstudio.com.',
      },
      {
        heading: 'Cookies',
        body: 'This site uses cookies required for the cart to function and, subject to your consent, analytics and marketing cookies. You can change your preferences at any time from the cookie banner shown at the bottom of the page.',
      },
      {
        heading: 'Governing law and disputes',
        body: 'This legal notice is governed by French law. In the event of a dispute, an amicable solution will be sought before any legal action. Failing agreement, French courts shall have sole jurisdiction.',
      },
    ],
  },

  'login.title': { fr: 'Connexion', en: 'Log in' },
  'login.subtitle': {
    fr: 'Connectez-vous pour retrouver vos commandes et vos favoris.',
    en: 'Log in to access your orders and favorites.',
  },
  'login.email': { fr: 'Email', en: 'Email' },
  'login.password': { fr: 'Mot de passe', en: 'Password' },
  'login.submit': { fr: 'Se connecter', en: 'Log in' },
  'login.noAccount': { fr: 'Pas encore de compte ?', en: "Don't have an account?" },
  'login.createAccount': { fr: 'Créer un compte', en: 'Create an account' },
  'login.demoNote': {
    fr: "Simulation — la connexion n'est pas encore reliée à un compte réel (V1).",
    en: 'Simulation — login is not yet connected to a real account (V1).',
  },
  'login.errors.email': { fr: 'Email invalide', en: 'Invalid email' },
  'login.errors.password': { fr: 'Mot de passe requis', en: 'Password required' },
};
