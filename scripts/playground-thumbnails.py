"""Regenerate small gallery previews. Development only: Python 3 and Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

source = Path(__file__).resolve().parent.parent / 'public/images/playground'
output = source / 'thumbnails'
output.mkdir(exist_ok=True)
for path in source.glob('*.webp'):
    with Image.open(path) as image:
        image = image.convert('RGB')
        if image.height > image.width * 1.25:
            image = image.crop((0, 0, image.width, round(image.width * 1.25)))
        image = ImageOps.contain(image, (600, 750), Image.Resampling.LANCZOS)
        canvas = Image.new('RGB', (600, 750), '#edf1f8')
        canvas.paste(image, ((600-image.width)//2, 0))
        canvas.save(output / path.name, 'WEBP', quality=83, method=6)
print('Generated 600 × 750 gallery previews. Full-length originals are unchanged.')
