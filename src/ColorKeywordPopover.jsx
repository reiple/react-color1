import React, { useState } from 'react'
import {
  Button,
  Popover,
  Chip,
  TextField,
  IconButton,
  Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
// import { GithubPicker, TwitterPicker, CompactPicker } from 'react-color'
import { CompactPicker } from 'react-color'
import DeleteIcon from '@mui/icons-material/Delete'

const ColorKeywordPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [colors, setColors] = useState([
    {
      color: '#ff0000',
      keywords: ['정기 PM', '환자LOT'],
    },
    { color: '#0000ff', keywords: ['1K', '1k'] },
  ])
  const [newKeyword, setNewKeyword] = useState([])

  const [colorPickerAnchor, setColorPickerAnchor] = useState(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState(null)

  const [newColorPickerAnchor, setNewColorPickerAnchor] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setColorPickerAnchor(null)
  }

  const handleAddKeyword = color => {
    setColors(prev =>
      prev.map(c =>
        c.color === color ? { ...c, keywords: [...c.keywords, newKeyword] } : c,
      ),
    )
    setNewKeyword('')
  }

  const handleDeleteKeyword = (color, keyword) => {
    setColors(prev =>
      prev.map(c =>
        c.color === color
          ? { ...c, keywords: c.keywords.filter(k => k !== keyword) }
          : c,
      ),
    )
  }

  const handleApply = () => {
    // 이 단계에서는 API를 호출하는 부분을 설정할 필요 없음
    console.log('Save Colors:', JSON.stringify(colors))
    handleClose()
  }

  const handleColorClick = (event, index) => {
    setColorPickerAnchor(event.currentTarget) // Open color picker at the clicked color position
    setSelectedColorIndex(index)
  }

  const handleColorChange = color => {
    if (selectedColorIndex !== null) {
      setColors(prev =>
        prev.map((c, index) =>
          index === selectedColorIndex ? { ...c, color: color.hex } : c,
        ),
      )
    }
  }

  const handleNewColorClick = event => {
    setNewColorPickerAnchor(event.currentTarget)
  }

  const handleNewColorChange = newColor => {
    setColors([...colors, { color: newColor, keywords: [] }])
  }

  const handleDeleteColor = index => {
    setColors(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        글자 강조 설정
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box
          p={2}
          sx={{
            border: '4px solid', // 테두리 두께와 스타일 설정
            borderColor: 'black', // 테두리 색상 설정 (원하는 색상으로 변경 가능)
            boxShadow: 10, // 테두리와 어울리는 약간의 그림자 추가
          }}
        >
          {colors.map((colorData, index) => (
            <div key={colorData.color} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  components="div"
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: colorData.color,
                    marginRight: 2,
                  }}
                  onClick={e => handleColorClick(e, index)}
                ></Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {colorData.keywords.map(keyword => (
                      <Chip
                        key={keyword}
                        label={keyword}
                        onDelete={() =>
                          handleDeleteKeyword(colorData.color, keyword)
                        }
                        style={{ marginRight: 4 }}
                      />
                    ))}
                  </Box>
                </Box>
                <TextField
                  size="small"
                  placeholder="단어 추가"
                  value={newKeyword}
                  onChange={e => setNewKeyword(e.target.value, index)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddKeyword(colorData.color)
                  }}
                />
                <IconButton
                  onClick={() => handleDeleteColor(index)}
                  edge="end"
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}

          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={e => {
                handleNewColorClick(e)
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            fullWidth
          >
            Apply
          </Button>
        </Box>
      </Popover>
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={() => setColorPickerAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <CompactPicker
          color={
            selectedColorIndex !== null
              ? colors[selectedColorIndex].color
              : '#ffffff'
          }
          onChange={color => {
            handleColorChange(color)
            setColorPickerAnchor(null)
          }}
        />
      </Popover>
      <Popover
        open={Boolean(newColorPickerAnchor)}
        anchorEl={newColorPickerAnchor}
        onClose={() => setNewColorPickerAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <CompactPicker
          color="#000000"
          onChangeComplete={color => {
            handleNewColorChange(color.hex)
            setNewColorPickerAnchor(null)
          }}
        />
      </Popover>
    </div>
  )
}

export default ColorKeywordPopover
