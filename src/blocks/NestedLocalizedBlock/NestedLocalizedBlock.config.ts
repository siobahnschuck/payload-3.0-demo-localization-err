import type { Block } from 'payload'

// This block will not be able to publish twice on the same page due to error: Cannot read properties of undefined (reading '_pages_v_blocks_nested_localize_block_items_locales_locale_parent_id_')

const NestedLocalizedBlock: Block = {
  slug: 'nestedLocalizedBlock',
  interfaceName: 'NestedLocalizedBlockT',
  dbName: 'nlblock',
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
      required: false,
      fields: [
        {
          type: 'text',
          name: 'arrTitle',
          label: 'Block Title',
        },
        {
          type: 'richText',
          name: 'content',
          label: 'Content',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}

export default NestedLocalizedBlock
