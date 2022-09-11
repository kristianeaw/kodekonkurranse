export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Id',
      type: 'number',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'inputfile',
      type: 'object',
      fields: [
        {
          type: 'reference',
          name: 'inputfile',
          to: [{type: 'input'}]
        }
      ]
    },
    {
      name: 'svar',
      title: 'Svar',
      type: 'number',
    },
  ]
}
