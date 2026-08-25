from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle

ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public'
RED=colors.HexColor('#D52B1E'); INK=colors.HexColor('#171717'); GREY=colors.HexColor('#626262')
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleX',parent=styles['Title'],fontSize=27,leading=30,textColor=INK,spaceAfter=16))
styles.add(ParagraphStyle(name='H1X',parent=styles['Heading1'],fontSize=18,leading=22,textColor=RED,spaceBefore=14,spaceAfter=8))
styles.add(ParagraphStyle(name='H2X',parent=styles['Heading2'],fontSize=13,leading=16,textColor=INK,spaceBefore=10,spaceAfter=5))
styles.add(ParagraphStyle(name='BodyX',parent=styles['BodyText'],fontSize=9.4,leading=13.2,textColor=GREY,spaceAfter=7))

def footer(c,d):
 c.saveState(); c.setFont('Helvetica',8); c.setFillColor(GREY); c.drawString(inch,.45*inch,'THOMAS RYAN  |  MANUFACTURING REPORTING PLATFORM'); c.drawRightString(7.5*inch,.45*inch,str(d.page)); c.restoreState()
def p(t,s='BodyX'): return Paragraph(t,styles[s])
def build(path,long=False):
 story=[Spacer(1,.55*inch),p('Prepared reports. Faster review.<br/>Better operational context.','TitleX'),p('A SharePoint-first manufacturing intelligence platform for supervisor and manager decision support.'),Spacer(1,.16*inch)]
 story += [p('How people use the outputs','H1X'),p('<b>Shift Drafts</b> automate collection, reconciliation, organization, and spreadsheet preparation. Supervisors review exceptions, add context, and finalize faster.'),p('<b>Daily Production Reports</b> help managers understand production, molding, labor, quality, plan attainment, and downtime; investigate constraints; prioritize follow-up; and inform staffing, plan, maintenance, or coordination changes.'),p('<b>Weekly Production and Downtime Reports</b> show trends, comparisons, and recurring problems for planning, improvement, meetings, reviews, and handoffs.')]
 cell=ParagraphStyle(name='Cell',parent=styles['BodyX'],fontSize=7.2,leading=9,textColor=GREY)
 data=[['INPUT','PROCESS','OUTPUT','REVIEW + ACTION'],[Paragraph('Forms, SharePoint, files, machine events',cell),Paragraph('Ingest, reconcile, link sources, validate',cell),Paragraph('Shift drafts, daily and weekly reports, dashboard',cell),Paragraph('People interpret context and decide',cell)]]
 t=Table(data,colWidths=[1.6*inch]*4); t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('TEXTCOLOR',(0,0),(-1,0),colors.white),('BACKGROUND',(0,1),(-1,-1),colors.HexColor('#F0F0EE')),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,0),7.5),('GRID',(0,0),(-1,-1),.5,colors.HexColor('#CCCCCC')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)])); story += [Spacer(1,.1*inch),t]
 story += [p('Operational value with clear boundaries','H1X'),p('<b>Modeled planning opportunity:</b> 20 supervisor plus 10 manager hours of reporting effort per week, representing about $52K in annual labor value under documented assumptions.'),p('The value is reduced preparation, faster access to consistent information, visible exceptions, and more time for interpretation and follow-up. The model is not booked savings or a guaranteed outcome; the platform supports decisions rather than making them.')]
 if long:
  story += [PageBreak(),p('Architecture and reliability evidence','TitleX'),p('SharePoint and Forms intake','H2X'),p('Five Power Automate flows cover reminders, machine events, machine whiteboard submissions, molding-report archive, and labor notes. SharePoint lists and libraries retain operational inputs and outputs.'),p('Source-linked reporting core','H2X'),p('Python ingestion and reconciliation normalize evidence into eight PostgreSQL serving tables. Workbooks and the API/SPFx dashboard expose prepared reporting views with source lineage.'),p('Fail-closed delivery','H2X'),p('Validation preserves missing-versus-zero semantics. Artifact readback, bounded repair, one-writer releases, and rollback prevent unvalidated output from silently replacing the last known-good release.'),p('Public/private boundary','H1X'),p('Public assets use synthetic data and sanitized architecture. Tenant identifiers, employee data, production URLs, credentials, and exact operating details remain in the private handoff. Credentials are transferred only through an approved secure channel.')]
 SimpleDocTemplate(str(path),pagesize=letter,rightMargin=.75*inch,leftMargin=.75*inch,topMargin=.65*inch,bottomMargin=.7*inch,title='PepperBall Reporting Platform Case Study',author='Thomas Ryan').build(story,onFirstPage=footer,onLaterPages=footer)
build(OUT/'Thomas-Ryan-PepperBall-Case-Study.pdf',False)
build(OUT/'Thomas-Ryan-PepperBall-End-to-End-Case-Study.pdf',True)
