'''
Image to Ascii using Pyhton Pillow library
Author : [Sunil Shrestha][@Xtha-Sunil] 
'''

from PIL import Image

# ASCII characters from dark to light
ASCII_CHARS = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]

def resize_image(image, new_width=100):
    width, height = image.size
    ratio = height / width / 1.65
    new_height = int(new_width * ratio)
    return image.resize((new_width, new_height))

def grayify(image):
    return image.convert("L")

def pixels_to_ascii(image):
    pixels = image.getdata()
    chars = "".join([ASCII_CHARS[pixel // 25] for pixel in pixels])
    return chars

def main(image_path, new_width=100):
    try:
        image = Image.open(image_path)
    except Exception as e:
        print("Unable to open image:", e)
        return

    image = resize_image(image, new_width)
    image = grayify(image)
    
    ascii_str = pixels_to_ascii(image)
    img_width = image.width
    ascii_img = "\n".join([ascii_str[i:i+img_width] for i in range(0, len(ascii_str), img_width)])
    
    # Appends
    # with open("ascii_image.txt", "a") as f:
    #     f.write(f"ASCII Art for {image_path}\n\n {ascii_img}\n\n")

    with open("ascii_image.txt", "w") as f:
        f.write(ascii_img)

    print(ascii_img)

# Example usage:
IMAGE_PATH = "python.png"
NEW_WIDTH = 100
main(IMAGE_PATH, NEW_WIDTH)
