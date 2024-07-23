import type { Block } from 'payload'

// This block will prevent migrations from being ran, and will surface the error:

const NestedLocalizedArrLevelBlock: Block = {
  slug: 'nestedLocalizedArrLevelBlock',
  interfaceName: 'NestedLocalizedArrLevelBlockT',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Block Title',
      localized: true,
    },
    {
      type: 'array',
      name: 'items',
      label: 'Items',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Block Title',
        },
        {
          type: 'richText',
          name: 'content',
          label: 'Content',
          required: true,
        },
      ],
    },
  ],
}

export default NestedLocalizedArrLevelBlock
