import validateExpression from "../regex-validator.mjs";

test('properly validates regular expression', () => {
    expect(validateExpression("(1or0|(y)*)*")).toEqual(true)
    expect(validateExpression("x|zeme|(7lw)*(p)|nm")).toEqual(true)
    expect(validateExpression("(lk5)*|w6ax|1u2j|(j)*")).toEqual(true)
    expect(validateExpression("(wmmmt|o)*")).toEqual(true)
    expect(validateExpression("u|wq|qm0u|wq|qm0u|(wq|qm0)*")).toEqual(true)
    expect(validateExpression("((((d)*|aw2o|d|cv6o)*)(ys|p|(j)*|4)(hi|u7|lqcg|(92as)*))*|(wmmmt|o)*")).toEqual(true)
    expect(validateExpression("((8z6k|(7o4)*|5h|(i)*)(o)((lwg|7igftf)*)(aa))*")).toEqual(true)
    expect(validateExpression("((u8p|y|j)((p5x|ypje|(dr)*|y1g)*))*|((7g|(j)*|fhx)*)((e|xo1)*)(k01j)|(flbb|y93w|dk)(hvd)|qz")).toEqual(true)
    expect(validateExpression("(3l|(u)*|(f)*|lft)((f6|a72|g3r|ils)*)(6|(xw)*|zhm)|9o")).toEqual(true)
    expect(validateExpression("((((mbej)*|mv)(c4)((p)*|q88y)|((bo)(ysw|po|n9g|(ggm)*)(1|qa8)(o|u))*)*)(614b)(wi99)")).toEqual(true)
    expect(validateExpression("(1i6n)((((h)(3n))*|(ix8|(x)*|bce7)(z2n)(54a|8|fd6|(z)*)(99|p|(gp)*))*)((p|phm|z)*)(((9i|w)(f64|cbwc|xnce|l)|qph)*)")).toEqual(true)
    expect(validateExpression("((gj0|t|((r0j|w|(8i)*|(r)*)*)((0js|91|wvk|i)*)((e1b|jio|4cqe|(od9j)*)*))((p4c|cj|((zwus)(ahxj))*)*))*")).toEqual(true)
    expect(validateExpression("((l10)((((an3n|yj|ca8|n)*)(ps|(x)*|ukxa|p0oz)(hm|igbk|p))*|(d|3|8v4|jk5)(swub)((3n|d5|la)*)(1a))((lnq|mkp|(c|(2hd3)*)(mk|j4r9|(uy)*))*)(b|(((too|vl|f)*)(((gxr)*|2g)*))*))*")).toEqual(true)
    expect(validateExpression("((c8az|((cp0)((uw42)*|zq)(h5bu)(8dx1))*|(((z|(1)*|k5)*)(((s)*|d|(81)*)*))*)(((((kam|(jyk)*|(a5)*)*)(6chu)(244|mj5)((o1u8)*|(5f2t)*|i))*|(d8o|y18e|i|(7bvm)*)(31r)(((3n)*|(g9)*|6u0u)*)|(sehk)(7|(5w)*)(h|(s5v)*|2ca)((86w|s|yn8|h4)*)|(w)(xn)((s74|(5)*|(j)*|(h)*)*)((r|8|yqfx)*))*)((((xuh9)*|nmoq)((dn|4ou|(xc4)*)*)((97|r8|(vv)*|5)*))*|ee4)(((((yc)*|3k|(nnq)*)*)(p0o)((y|zlkz)*)(s9)|wbss|((oimb)((tlw6|uw9k|ce)*)(l6o3))*|sx2c)*))*")).toEqual(true)
    expect(validateExpression("p")).toEqual(true);
    expect(validateExpression(")1sajf|kl|p")).toEqual(false);
    expect(validateExpression("1sajf|kl|p*")).toEqual(false);
    expect(validateExpression("")).toEqual(false);
    expect(validateExpression("*")).toEqual(false);
    expect(validateExpression("(")).toEqual(false);
    expect(validateExpression("|")).toEqual(false);
    expect(validateExpression(")")).toEqual(false);
    expect(validateExpression("**")).toEqual(false);
    expect(validateExpression("(1or0|(y)*)*|p||l")).toEqual(false);
    expect(validateExpression("k(l)**|mn")).toEqual(false);
    expect(validateExpression("qw|*|v")).toEqual(false);
    expect(validateExpression("|kjh")).toEqual(false);
    expect(validateExpression("ty|r*t")).toEqual(false);
    expect(validateExpression("(*ksp")).toEqual(false);
    expect(validateExpression("((n)*0|)")).toEqual(false);
    expect(validateExpression("kl|m(|n)")).toEqual(false);
    expect(validateExpression("(l)*|")).toEqual(false);
    expect(validateExpression("(1or0|y)*)*")).toEqual(false);
    expect(validateExpression("()1or0|y)*)*")).toEqual(false);
    expect(validateExpression("(1or)0|y)*)*")).toEqual(false);
    expect(validateExpression("(1or0|(((y)*))*")).toEqual(false);
    expect(validateExpression("(l)(m)(n)(j)1or0|y)*)*")).toEqual(false);
})

