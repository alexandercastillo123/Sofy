import sys
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import numpy as np

sys.path.insert(0, os.path.dirname(__file__))

from Process.RumboVeta import RumboVeta
from Process.Core import Core


def main():
    rv = RumboVeta()
    core = Core()

    # Datos de ejemplo (Formato 1 / Zona 4)
    punto1 = (188741.0, 9106426.0, 4245.0)   # EM
    punto2 = (188696.0, 9106369.0)
    frente = (188899.0, 9106271.0, 3800.0)
    buzamiento = 10.0
    seccion = (2.0, 2.0)
    roca = (2.7, 1.3)
    voladuraCostos = (1.0, 2.0, 2000.0)

    # 1) Rumbo de veta
    res = rv.analisisRumboVeta(punto1, punto2)
    print("=== analisisRumboVeta ===")
    print(res)
    caso = res["caso"]
    titulo = res["titulo"]
    Rv = res["Rv"]

    # 2) Direccion de buzamiento (derecha)
    if caso == "Caso 1":
        dirBuzamiento = "SE"
    else:
        dirBuzamiento = "SW"

    # 3) Zona y Formato
    fmt = rv.hallar_formato_Caso(caso, dirBuzamiento, Rv, punto1, frente)
    print("\n=== hallar_formato_Caso ===")
    print(fmt)
    zona = fmt["Zona"]
    formato = fmt["Formato"]

    # 4) EP
    ep = rv.calcularEP(caso, dirBuzamiento, punto1, frente, Rv, buzamiento)
    print("\n=== calcularEP ===")
    print("EP =", ep)

    # 5) Core analisis
    metodo = getattr(core, f"analisis{formato}", None)
    if metodo is None:
        print(f"\nNo existe metodo analisis{formato}")
        return

    resultado = metodo(zona, punto1, punto2, frente, ep, Rv, buzamiento, seccion, roca, voladuraCostos)
    print(f"\n=== {formato} ===")
    if resultado is None:
        print("Resultado: None (sin datos de prueba)")
        return

    (cxDiagonal, cxPerpendicular, distanciaProyecto, proyectoPerpendicular,
     proyectoDiagonal, puntoAltoE, puntoAltoW, puntoBajoE, puntoBajoW,
     frente_out, montos, CasoPizarraPorZona, ResuCaso) = resultado

    print("cxDiagonal   :", cxDiagonal)
    print("cxPerpendicular:", cxPerpendicular)
    print("distanciaProyecto:", distanciaProyecto)
    print("proyectoPerpendicular:", proyectoPerpendicular)
    print("proyectoDiagonal:", proyectoDiagonal)
    print("puntoAltoE   :", puntoAltoE)
    print("puntoAltoW   :", puntoAltoW)
    print("puntoBajoE   :", puntoBajoE)
    print("puntoBajoW   :", puntoBajoW)
    print("frente       :", frente_out)
    print("montos       :", montos)
    print("ResuCaso     :", ResuCaso)

    # 6) Generar imagen 3D para chequeo visual
    (DP_dec, DD_dec) = distanciaProyecto
    (EEP_dec, NEP_dec, CEP_dec) = cxDiagonal
    (EPC_dec, NPC_dec, CPC_dec) = cxPerpendicular
    (RDp_dec, ZDp_dec, Area_P_dec, Volumen_P_dec, Volumen_esps_P_dec,
     Tonelaje_P_dec, Duracion_P_dec, Disparos_P_dec, Costo_P_dec) = proyectoPerpendicular
    (RDD_dec, ZDD_dec, Area_D_dec, Volumen_D_dec, Volumen_esps_D_dec,
     Tonelaje_D_dec, Duracion_D_dec, Disparos_D_dec, Costo_D_dec) = proyectoDiagonal

    ResultadoRumbo = RumboVeta.Rumbo3D(RDp_dec, RDD_dec, ZDp_dec, ZDD_dec)
    (RDp_txt, txtRDp, RDD_txt, txtRDD) = ResultadoRumbo

    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection="3d")

    puntoBajoE_linea1 = (puntoAltoE[0], puntoAltoE[1], puntoAltoW[2])
    cuadrado_vertices = np.array([
        [puntoAltoE[0], puntoAltoE[1], puntoAltoE[2]],
        [puntoAltoW[0], puntoAltoW[1], puntoAltoW[2]],
        [puntoBajoW[0], puntoBajoW[1], puntoBajoW[2]],
        [puntoBajoE[0], puntoBajoE[1], puntoBajoE[2]],
        [puntoBajoE_linea1[0], puntoBajoE_linea1[1], puntoBajoE_linea1[2]],
    ])
    cuadrado = Poly3DCollection([cuadrado_vertices],
                                facecolors=["#ffd700", "#ffd700", "#c0a000", "#c0a000", "#ffd700"],
                                alpha=0.5)
    ax.add_collection3d(cuadrado)

    ax.scatter(*zip(punto1), color="black", s=60, label="EM")
    ax.scatter(*zip(ep), color="blue", s=60, label="EP")
    ax.scatter(*zip((EPC_dec, NPC_dec, CPC_dec)), color="red", s=60, label="PC")
    ax.scatter(*zip(frente_out), color="green", s=60, label="Frente")
    ax.scatter(*zip(puntoAltoE), color="orange", s=40, label="Alto E")
    ax.scatter(*zip(puntoAltoW), color="orange", s=40, label="Alto W")
    ax.scatter(*zip(puntoBajoE), color="gray", s=40, label="Bajo E")
    ax.scatter(*zip(puntoBajoW), color="gray", s=40, label="Bajo W")

    if ResuCaso in ("Original", "Caso1", "Alterno"):
        Estadodistancia = "Positivo"
    else:
        Estadodistancia = "DP Negativo"

    if Estadodistancia == "Positivo":
        ax.quiver(frente_out[0], frente_out[1], frente_out[2],
                  (EPC_dec, NPC_dec, CPC_dec)[0] - frente_out[0],
                  (EPC_dec, NPC_dec, CPC_dec)[1] - frente_out[1],
                  (EPC_dec, NPC_dec, CPC_dec)[2] - frente_out[2],
                  color="red", arrow_length_ratio=0.05, linewidth=1)
        ax.quiver(frente_out[0], frente_out[1], frente_out[2],
                  ep[0] - frente_out[0], ep[1] - frente_out[1], ep[2] - frente_out[2],
                  color="blue", arrow_length_ratio=0.05, linewidth=1)

    ax.text(punto1[0], punto1[1], punto1[2], "EM", color="black")
    ax.text(ep[0], ep[1], ep[2], "EP", color="blue")
    ax.text(EPC_dec, NPC_dec, CPC_dec, "PC", color="red")
    ax.text(frente_out[0], frente_out[1], frente_out[2], "F", color="green")

    x_linea1 = np.array([puntoAltoE[0], puntoAltoW[0]])
    y_linea1 = np.array([puntoAltoE[1], puntoAltoW[1]])
    z_linea1 = np.array([puntoAltoE[2], puntoAltoW[2]])
    x_linea2 = np.array([puntoBajoE[0], puntoBajoW[0]])
    y_linea2 = np.array([puntoBajoE[1], puntoBajoW[1]])
    z_linea2 = np.array([puntoBajoE[2], puntoBajoW[2]])
    ax.plot(x_linea1, y_linea1, z_linea1, color="orange", linewidth=2, label="Lateral 1")
    ax.plot(x_linea2, y_linea2, z_linea2, color="orange", linestyle="--", linewidth=2, label="Lateral 2")

    ax.set_xlabel("ESTE")
    ax.set_ylabel("NORTE")
    ax.set_zlabel("COTA")
    ax.set_title(f"SIMULACION 3D - {formato} - {zona} - {ResuCaso}")
    ax.legend()

    out_path = os.path.join(os.path.dirname(__file__), "horus_3d_check.png")
    plt.savefig(out_path, dpi=150, bbox_inches="tight")
    print(f"\nImagen 3D guardada en: {out_path}")
    plt.close(fig)


if __name__ == "__main__":
    main()
