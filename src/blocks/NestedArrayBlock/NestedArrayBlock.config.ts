import type { Block } from 'payload'

const NestedArrayBlock: Block = {
  slug: 'nestedArrayBlock',
  interfaceName: 'NestedArrayBlockT',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Block Title',
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

export default NestedArrayBlock
