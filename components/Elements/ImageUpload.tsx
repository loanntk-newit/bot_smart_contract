import React from 'react'
import PropTypes from 'prop-types'

// components
import Button from '@/components/Elements/Button'

// types
type Props = {
  placeholder?: string
  changeButton: object
  removeButton: object
  onChange: (x: any, y: any) => {}
  onRemove: () => {}
}

export default function ImageUpload({
  placeholder,
  changeButton,
  removeButton,
  onChange,
  onRemove,
}: Props) {
  const [file, setFile] = React.useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(placeholder)
  const fileInput: any = React.useRef(null)
  const handleImageChange = (e: any) => {
    e.preventDefault()
    let reader: any = new FileReader()
    let file: any = e.target.files[0]
    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
      onChange(file, reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const handleClick = () => {
    fileInput.current.click()
  }
  const handleRemove = () => {
    setFile(null)
    setImagePreviewUrl(placeholder)
    onRemove()
    fileInput.current.value = null
  }
  return (
    <>
      <div className="text-center">
        <input className="hidden" type="file" onChange={handleImageChange} ref={fileInput} />
        <div className="rounded mx-auto shadow-lg max-w-100-px mb-4">
          <img className="rounded" src={imagePreviewUrl} alt="..." />
        </div>
        <div>
          <Button {...changeButton} onClick={handleClick} />
          <Button {...removeButton} onClick={handleRemove} />
        </div>
      </div>
    </>
  )
}

ImageUpload.defaultProps = {
  changeButton: { children: 'change', size: 'sm', color: 'dark' },
  removeButton: { children: 'remove', size: 'sm', color: 'red', outline: true },
  onChange: () => {},
  onRemove: () => {},
}

ImageUpload.propTypes = {
  // this is the default image that
  // appears when no image is uploaded
  placeholder: PropTypes.string,
  // props to pass to the change Button component
  changeButton: PropTypes.object,
  // props to pass to the remove Button component
  removeButton: PropTypes.object,
  // this function will get called when
  // clicking the changeButton
  // and it has two parameters, the image, and the image preview
  // example of usage: onChange={(image,imagePreviewUrl) => {console.log("image is :",image);console.log("image preview url is: ",imagePreviewUrl);}}
  onChange: PropTypes.func,
  // this function will get called when
  // clicking the removeButton, and does not have any params
  // example of usage: onRemove={() => console.log("remove happened")}
  onRemove: PropTypes.func,
}
