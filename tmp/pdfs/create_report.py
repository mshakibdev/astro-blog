from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from pypdf import PdfReader
import pypdfium2 as pdfium

out=Path('output/pdf/astro-blog-update-report.pdf')
s=getSampleStyleSheet()
s.add(ParagraphStyle(name='TitleCustom',fontName='Helvetica-Bold',fontSize=27,leading=32,textColor=colors.HexColor('#0f172a'),spaceAfter=12))
s.add(ParagraphStyle(name='Sub',fontSize=10,leading=15,textColor=colors.HexColor('#475569'),spaceAfter=16))
s.add(ParagraphStyle(name='BodyCustom',fontSize=10,leading=15,spaceAfter=8))
s.add(ParagraphStyle(name='SectionCustom',fontName='Helvetica-Bold',fontSize=14,leading=19,spaceBefore=12,spaceAfter=8,textColor=colors.HexColor('#0369a1')))
s.add(ParagraphStyle(name='CellCustom',fontSize=9,leading=13))
s.add(ParagraphStyle(name='FileCustom',fontName='Courier',fontSize=8,leading=12))
story=[]
def p(t,style='BodyCustom'): return Paragraph(t,s[style])
def add(t,style='BodyCustom'): story.append(p(t,style))
add('Astro Blog<br/>Update Report','TitleCustom')
add('21 September 2026 | Features, implementation changes and verification','Sub')
add('Publishing now starts with one Markdown file. The homepage and article pages read from the same validated content collection, replacing duplicated hardcoded post data.')
add('What was added','SectionCustom')
features=[
('Markdown publishing','Each article lives in src/content/posts/. Its filename determines its blog URL. The two existing posts were migrated with their original URLs and sample body text preserved.'),
('Validated post metadata','Required title, description and date; optional tags and cover image. A cover requires a public image path and non-empty alternative text. Invalid metadata fails collection validation.'),
('Automatic post listing and routes','The homepage loads posts from the collection, sorts newest first and shows an empty-state message when no posts exist. Article pages are generated from that same collection.'),
('Article presentation','Pages now show publication dates, tag labels, optional cover images and an All posts link. Markdown styles cover headings, paragraphs, lists, links, quotations, images and code blocks.'),
('Mobile and date consistency','Narrow screens receive smaller outer margins and content padding. Shared date formatting uses UTC, preventing the displayed calendar day from shifting with the server timezone.'),
('Type safety and checks','Post arrays now explicitly use CollectionEntry&lt;"posts"&gt;[] to provide types for sorting and mapping callbacks. Astro check and TypeScript 6 were added; every production build now runs type checking first.')]
for title,body in features:
    add('<b>'+title+'</b><br/>'+body)
add('Verification','SectionCustom')
add('Latest verification: <b>0 errors, 0 warnings and 0 hints</b> across 10 checked files. The production build generated five pages. Both article links, return navigation, and desktop/mobile layouts were checked in the browser.')
add('Scope and current limits','SectionCustom')
add('The articles still contain placeholder text. Tags are display labels, with no tag archive pages yet. All post files are published, including future-dated posts; there is no draft mode. Search, RSS, sitemap, comments and a CMS were not added.')
story.append(PageBreak())
add('Files changed','TitleCustom')
add('Project: D:/Frontend/astro/astro-blog<br/>This inventory covers the implementation work in this conversation. Paths below are relative to the project root.','Sub')
rows=[['File / status','Purpose'],
['src/content.config.ts\nNEW','Defines the posts loader and metadata validation schema.'],
['src/content/posts/getting-started.md\nNEW','Stores the first migrated article with its metadata and body.'],
['src/content/posts/why-astro-fast.md\nNEW','Stores the second migrated article with its metadata and body.'],
['src/components/PostDate.astro\nNEW','Reusable, typed date component with UTC formatting and a semantic time element.'],
['src/pages/index.astro\nUPDATED','Reads and sorts the collection, renders dates, adds an empty state and explicitly types the post array.'],
['src/pages/blog/[slug].astro\nUPDATED','Generates routes from posts, renders Markdown and metadata, adds article styles and explicitly types posts.'],
['src/layouts/Layout.astro\nUPDATED','Applies global border-box sizing and improves mobile main-content spacing.'],
['package.json\nUPDATED','Adds the check command, type checking before builds, @astrojs/check and TypeScript development dependencies.'],
['pnpm-lock.yaml\nUPDATED','Records the added development tools and their resolved dependencies.'],
['README.md\nUPDATED','Explains post creation, required fields, optional covers, URL naming, publishing and background dev commands.']]
data=[]
for i,row in enumerate(rows):
    data.append([p(row[0].replace('\n','<br/>'),'CellCustom' if i==0 else 'FileCustom'),p(row[1],'CellCustom')])
t=Table(data,colWidths=[235,280],hAlign='LEFT')
t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e0f2fe')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,-1),0.4,colors.HexColor('#cbd5e1'))]))
story.append(t)
add('Generated files','SectionCustom')
add('Astro refreshed generated types/content data under .astro/ and rebuilt the site under dist/. These are generated outputs, not files to edit when writing posts.')
add('Adding your next post','SectionCustom')
add('1. Add a .md file directly inside src/content/posts/.<br/>2. Add title, description and date in frontmatter, then write the article.<br/>3. Run npm run build and deploy the updated dist/ output.<br/>Use npm run check whenever you only need type diagnostics.')
def footer(c,d):
    c.setStrokeColor(colors.HexColor('#cbd5e1')); c.line(40,37,555,37)
    c.setFont('Helvetica',8); c.setFillColor(colors.HexColor('#64748b'))
    c.drawString(40,24,'ASTRO BLOG / IMPLEMENTATION REPORT'); c.drawRightString(555,24,str(d.page))
SimpleDocTemplate(str(out),pagesize=(595.28,841.89),rightMargin=40,leftMargin=40,topMargin=36,bottomMargin=50,title='Astro Blog Update Report',author='').build(story,onFirstPage=footer,onLaterPages=footer)
r=PdfReader(out)
assert len(r.pages)==2, len(r.pages)
for idx,page in enumerate(pdfium.PdfDocument(str(out))):
    page.render(scale=1.3).to_pil().save(f'tmp/pdfs/report-page-{idx+1}.png')
print(f'Created {out.resolve()} ({len(r.pages)} pages)')

