import type { Schema, Attribute } from '@strapi/strapi';

export interface ChartsRadar extends Schema.Component {
  collectionName: 'components_charts_radars';
  info: {
    displayName: 'Radar';
    icon: 'chartCircle';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    general: Attribute.Component<'coffe-attributes.general'>;
    defects: Attribute.Component<'coffe-attributes.defects'>;
    quality: Attribute.Component<'coffe-attributes.beans-quality'>;
  };
}

export interface CoffeAttributesBeansQuality extends Schema.Component {
  collectionName: 'components_coffe_attributes_beans_qualities';
  info: {
    displayName: 'Beans Quality';
    icon: 'seed';
  };
  attributes: {
    humidity: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    color: Attribute.String;
    roast: Attribute.String;
    sizes_16_18: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    sizes_13_15: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
    stain_percentage: Attribute.Decimal;
  };
}

export interface CoffeAttributesDefects extends Schema.Component {
  collectionName: 'components_coffe_attributes_defects';
  info: {
    displayName: 'Defects';
    icon: 'thumbDown';
  };
  attributes: {
    damaged: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    bitten: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    burned: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    immature: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
    sour: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }>;
  };
}

export interface CoffeAttributesGeneral extends Schema.Component {
  collectionName: 'components_coffe_attributes_generals';
  info: {
    displayName: 'General';
    icon: 'cup';
    description: '';
  };
  attributes: {
    origin: Attribute.String;
    tasting_date: Attribute.Date;
    altitude: Attribute.Decimal;
    acidity: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    body: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    taste: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    residual_taste: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    balance: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    uniformity: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    clean_cup: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    sweetness: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
    taster: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 10;
      }> &
      Attribute.DefaultTo<0>;
  };
}

export interface GlobalAttribute extends Schema.Component {
  collectionName: 'components_global_attributes';
  info: {
    displayName: 'Attribute';
    icon: 'pin';
    description: '';
  };
  attributes: {
    key: Attribute.String;
    label: Attribute.String;
    value: Attribute.String;
  };
}

export interface GlobalCarousel extends Schema.Component {
  collectionName: 'components_global_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    articles: Attribute.Relation<
      'global.carousel',
      'oneToMany',
      'api::article.article'
    >;
    backgrounds: Attribute.Media;
  };
}

export interface GlobalLink extends Schema.Component {
  collectionName: 'components_global_links';
  info: {
    displayName: 'Link';
    icon: 'exit';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    SubLink: Attribute.Component<'global.sub-link', true>;
  };
}

export interface GlobalSlide extends Schema.Component {
  collectionName: 'components_global_slides';
  info: {
    displayName: 'Slide';
    icon: 'stack';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    sub_title: Attribute.String & Attribute.Required;
    background_image: Attribute.Media;
    articles: Attribute.Relation<
      'global.slide',
      'oneToOne',
      'api::article.article'
    >;
  };
}

export interface GlobalSubLink extends Schema.Component {
  collectionName: 'components_global_sub_links';
  info: {
    displayName: 'SubLink';
    icon: 'manyWays';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface GlobalVariant extends Schema.Component {
  collectionName: 'components_global_variants';
  info: {
    displayName: 'Variant';
    icon: 'manyWays';
    description: '';
  };
  attributes: {
    description: Attribute.RichText;
    price: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    roast: Attribute.Enumeration<['Ligero', 'Medio', 'Oscuro', 'Sin tostar']> &
      Attribute.Required &
      Attribute.DefaultTo<'Medio'>;
    gallery: Attribute.Media;
    image: Attribute.Media;
    ground: Attribute.Enumeration<['Grano', 'Grueso', 'Medio', 'Fino']> &
      Attribute.Required &
      Attribute.DefaultTo<'Grano'>;
    name: Attribute.String;
    weight: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'charts.radar': ChartsRadar;
      'coffe-attributes.beans-quality': CoffeAttributesBeansQuality;
      'coffe-attributes.defects': CoffeAttributesDefects;
      'coffe-attributes.general': CoffeAttributesGeneral;
      'global.attribute': GlobalAttribute;
      'global.carousel': GlobalCarousel;
      'global.link': GlobalLink;
      'global.slide': GlobalSlide;
      'global.sub-link': GlobalSubLink;
      'global.variant': GlobalVariant;
    }
  }
}
