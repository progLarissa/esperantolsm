import sys, os
HERE=os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,HERE)
from patch_noaudio import patch, CSS, CONTENT, rep
d=HERE+'/'
head=open(d+'eo_head.html').read()
css=open(d+'css_generic.css').read()+'\n'+open(d+'css_examplan.css').read()+open(d+'css_identity.css').read()+CSS
skel=open(d+'skel.html').read()
content=''.join(open(d+f).read()+'\n' for f in ['eo_u1.js','eo_u2.js','eo_u3.js','eo_t1.js','eo_t2.js','eo_t3.js','eo_story.js','eo_rad.js'])
eng=''.join(open(d+f).read()+'\n' for f in ['eo_engine_a.js','eo_engine_b.js','eo_engine_c.js','eo_engine_d.js'])
eng=patch(eng)
eng=rep(eng,CONTENT)
open(os.path.join(HERE,'..','index.html'),'w').write(head+css+skel+content+eng)
print('ok')
