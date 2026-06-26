"""
Fintech uslubidagi statik banner generatori.
Ko'k-yashil gradient, minimalist, zamonaviy.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

W, H = 1024, 512  # Telegram uchun yaxshi nisbat (16:8 ~ 2:1)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# Fintech rang palitasi
COLOR_DARK_BG = (10, 20, 35)        # juda qorong'i ko'k-kulrang fon
COLOR_GREEN = (16, 222, 145)         # yorqin yashil (fintech accent)
COLOR_BLUE = (37, 99, 235)           # ko'k accent
COLOR_WHITE = (255, 255, 255)
COLOR_LIGHT_GRAY = (180, 196, 210)


def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def make_gradient_bg(w, h, color_top_left, color_bottom_right):
    """Diagonal gradient fon yaratish"""
    base = Image.new("RGB", (w, h), COLOR_DARK_BG)
    top = Image.new("RGB", (w, h), color_top_left)
    bottom = Image.new("RGB", (w, h), color_bottom_right)
    mask = Image.new("L", (w, h))
    mask_data = []
    for y in range(h):
        for x in range(w):
            # diagonal gradient mask
            t = (x / w * 0.5 + y / h * 0.5)
            mask_data.append(int(255 * t))
    mask.putdata(mask_data)
    base = Image.composite(bottom, top, mask)
    return base


def add_glow_circle(img, center, radius, color, alpha=60):
    """Yumshoq nur effekti (glow) qo'shish - fintech uslubiga xos"""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y = center
    draw.ellipse([x - radius, y - radius, x + radius, y + radius],
                 fill=(*color, alpha))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius // 2))
    img.paste(Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB"), (0, 0))
    return img


def base_canvas():
    """Asosiy fintech fon: qorong'i, gradient, glow effektlar bilan"""
    img = make_gradient_bg(W, H, (8, 14, 26), (15, 32, 48))
    img = img.convert("RGBA")

    # Yashil glow - yuqori o'ngda
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.ellipse([W - 420, -200, W + 100, 320], fill=(*COLOR_GREEN, 35))
    overlay = overlay.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(img, overlay)

    # Ko'k glow - pastda chapda
    overlay2 = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw2 = ImageDraw.Draw(overlay2)
    draw2.ellipse([-200, H - 300, 350, H + 200], fill=(*COLOR_BLUE, 45))
    overlay2 = overlay2.filter(ImageFilter.GaussianBlur(90))
    img = Image.alpha_composite(img, overlay2)

    return img.convert("RGB")


def draw_grid_lines(img, opacity=12):
    """Fintech uslubiga xos nozik grid chiziqlar"""
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    step = 64
    for x in range(0, W, step):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, opacity), width=1)
    for y in range(0, H, step):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, opacity), width=1)
    img2 = Image.alpha_composite(img.convert("RGBA"), overlay)
    return img2.convert("RGB")


def draw_text_centered(draw, text, font, y, color=COLOR_WHITE, x_center=None):
    if x_center is None:
        x_center = W // 2
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((x_center - tw / 2, y), text, font=font, fill=color)
    return th


def draw_rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def make_icon_chart_up(draw, cx, cy, size, color):
    """O'sib boruvchi grafik ikonasi (chiziqli)"""
    pts = [
        (cx - size, cy + size * 0.5),
        (cx - size * 0.3, cy - size * 0.1),
        (cx + size * 0.2, cy + size * 0.3),
        (cx + size, cy - size * 0.7),
    ]
    draw.line(pts, fill=color, width=6, joint="curve")
    # uchida o'q-strelka
    ax, ay = pts[-1]
    draw.polygon([(ax, ay), (ax - 22, ay + 6), (ax - 6, ay + 22)], fill=color)
    for p in pts:
        draw.ellipse([p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5], fill=COLOR_WHITE)


def banner_welcome():
    img = base_canvas()
    img = draw_grid_lines(img)
    draw = ImageDraw.Draw(img)

    font_title = ImageFont.truetype(FONT_BOLD, 64)
    font_sub = ImageFont.truetype(FONT_REGULAR, 28)
    font_emoji_label = ImageFont.truetype(FONT_BOLD, 36)

    # Markazda ikonka - hamyon/coin doira
    cx, cy = W // 2, 150
    r = 70
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=COLOR_GREEN, width=5)
    draw.ellipse([cx - r + 14, cy - r + 14, cx + r - 14, cy + r - 14], fill=(*COLOR_GREEN, 30) if False else None, outline=COLOR_BLUE, width=3)
    # $ belgisi o'rniga "%" belgisi (kredit/foiz nuqtai nazaridan)
    font_pct = ImageFont.truetype(FONT_BOLD, 70)
    bbox = draw.textbbox((0,0), "%", font=font_pct)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    draw.text((cx - tw/2, cy - th/2 - bbox[1]), "%", font=font_pct, fill=COLOR_GREEN)

    draw_text_centered(draw, "KREDIT KALKULYATOR", font_title, 260, COLOR_WHITE)
    draw_text_centered(draw, "Tezkor  •  Aniq  •  Ishonchli", font_sub, 340, COLOR_LIGHT_GRAY)

    # pastki chiziq - accent
    draw.rectangle([W//2 - 120, 400, W//2 + 120, 404], fill=COLOR_GREEN)

    img.save("/home/claude/credit-bot-node/assets/banner_welcome.png", quality=95)


def banner_language():
    img = base_canvas()
    img = draw_grid_lines(img)
    draw = ImageDraw.Draw(img)

    font_title = ImageFont.truetype(FONT_BOLD, 52)
    font_flag = ImageFont.truetype(FONT_BOLD, 48)

    draw_text_centered(draw, "TILNI TANLANG", font_title, 90, COLOR_WHITE)
    draw_text_centered(draw, "Выберите язык", ImageFont.truetype(FONT_REGULAR, 30), 165, COLOR_LIGHT_GRAY)

    # ikkita "karta" - UZ va RU
    card_w, card_h = 360, 200
    gap = 40
    total_w = card_w * 2 + gap
    start_x = (W - total_w) // 2
    y = 260

    for i, (label, sub) in enumerate([("UZ", "O'zbekcha"), ("RU", "Русский")]):
        x = start_x + i * (card_w + gap)
        color = COLOR_GREEN if i == 0 else COLOR_BLUE
        draw_rounded_rect(draw, [x, y, x + card_w, y + card_h], 24,
                           fill=(20, 32, 48), outline=color, width=3)
        f = ImageFont.truetype(FONT_BOLD, 56)
        bbox = draw.textbbox((0,0), label, font=f)
        tw = bbox[2]-bbox[0]
        draw.text((x + card_w/2 - tw/2, y + 40), label, font=f, fill=color)
        f2 = ImageFont.truetype(FONT_REGULAR, 24)
        bbox2 = draw.textbbox((0,0), sub, font=f2)
        tw2 = bbox2[2]-bbox2[0]
        draw.text((x + card_w/2 - tw2/2, y + 130), sub, font=f2, fill=COLOR_LIGHT_GRAY)

    img.save("/home/claude/credit-bot-node/assets/banner_language.png", quality=95)


def banner_result():
    img = base_canvas()
    img = draw_grid_lines(img)
    draw = ImageDraw.Draw(img)

    font_title = ImageFont.truetype(FONT_BOLD, 54)
    font_sub = ImageFont.truetype(FONT_REGULAR, 26)

    # Chap tomonda o'sish grafigi ikonasi
    make_icon_chart_up(draw, 150, 256, 70, COLOR_GREEN)

    draw_text_centered(draw, "HISOBLASH NATIJASI", font_title, 130, COLOR_WHITE, x_center=W//2 + 60)
    draw_text_centered(draw, "Sizning kredit imkoniyatingiz tayyor", font_sub, 200, COLOR_LIGHT_GRAY, x_center=W//2 + 60)

    # pastda 3 mini-karta (12/24/36 oy belgisi sifatida dekorativ)
    labels = ["12 OY", "24 OY", "36 OY"]
    colors = [COLOR_GREEN, COLOR_BLUE, (168, 85, 247)]
    card_w, card_h = 220, 130
    gap = 30
    total_w = card_w * 3 + gap * 2
    start_x = (W - total_w) // 2
    y = 300

    for i, lab in enumerate(labels):
        x = start_x + i * (card_w + gap)
        draw_rounded_rect(draw, [x, y, x + card_w, y + card_h], 20,
                           fill=(18, 30, 46), outline=colors[i], width=3)
        f = ImageFont.truetype(FONT_BOLD, 30)
        bbox = draw.textbbox((0,0), lab, font=f)
        tw = bbox[2]-bbox[0]
        draw.text((x + card_w/2 - tw/2, y + 45), lab, font=f, fill=colors[i])

    img.save("/home/claude/credit-bot-node/assets/banner_result.png", quality=95)


def banner_schedule():
    img = base_canvas()
    img = draw_grid_lines(img)
    draw = ImageDraw.Draw(img)

    font_title = ImageFont.truetype(FONT_BOLD, 50)
    font_sub = ImageFont.truetype(FONT_REGULAR, 26)

    draw_text_centered(draw, "TO'LOV JADVALI", font_title, 70, COLOR_WHITE)
    draw_text_centered(draw, "Oylik to'lovlar tafsiloti", font_sub, 140, COLOR_LIGHT_GRAY)

    # Dekorativ "jadval" chizig'i - bar chart uslubida
    bars_y_base = 420
    bar_w = 36
    gap = 18
    n = 14
    total_w = n * (bar_w + gap) - gap
    start_x = (W - total_w) // 2
    import random
    random.seed(7)
    heights = [random.randint(60, 200) for _ in range(n)]
    max_h = max(heights)
    for i, h in enumerate(heights):
        x = start_x + i * (bar_w + gap)
        bar_h = int((h / max_h) * 220)
        t = i / (n - 1)
        color = lerp_color(COLOR_GREEN, COLOR_BLUE, t)
        draw_rounded_rect(draw, [x, bars_y_base - bar_h, x + bar_w, bars_y_base], 8, fill=color)

    img.save("/home/claude/credit-bot-node/assets/banner_schedule.png", quality=95)


if __name__ == "__main__":
    banner_welcome()
    banner_language()
    banner_result()
    banner_schedule()
    print("Hammasi tayyor!")
