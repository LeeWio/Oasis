// import { Button } from '@heroui/button'
// import { Dropdown, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
// import { Link } from '@heroui/link'
// import { Icon, IconifyIconProps } from '@iconify/react'
// import { useMemo } from 'react'
//
// export type ContentTypePickerOption = {
//   label: string
//   id: string
//   type: 'option'
//   disabled: () => boolean
//   isActive: () => boolean
//   onClick: () => void
//   icon: IconifyIconProps['icon']
// }
//
// export type ContentTypePickerCategory = {
//   label: string
//   id: string
//   type: 'category'
// }
//
// export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>
//
// export type ContentTypePickerProps = {
//   options: ContentPickerOptions
// }
//
// const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
//   option.type === 'option'
// const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
//   option.type === 'category'
//
//
// export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
//   const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [options])
//
//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button disableRipple isIconOnly as={Link} color='default' size='sm' variant='light'>
//         </Button>
//       </DropdownTrigger>
//     </Dropdown>
//   )
// }
