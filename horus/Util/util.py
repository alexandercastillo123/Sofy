import tkinter as tk
import sounddevice as sd
import soundfile as sf
import math

continuar_reproduccion = True
 
# Esta función limpia el contenido de un frame específico
def limpiarFrame(frame):    
    for widget in frame.winfo_children():
        widget.destroy()

def getValue(value):      
    if len(value) == 0 or value == '' or value is None:
        return int(0)
    else:
        return value
    
# Permite obtener (X Menor y X Mayor) (Y Menor y Y Mayor) y tambien la escala
def LimitesGrafico2D( punto1, punto2, frente, N, S, E, W):
    print("data", punto1, punto2, frente, N, S, E, W)
     
    (p1x, p1y) = punto1
    (p2x, p2y) = punto2
    (fx, fy, c) = frente
    (Nx, Ny) = N
    (Sx, Sy) = S
    (Ex, Ey) = E
    (Wx, Wy) = W

    distancia =None
    PuntoBajoI = None
    PuntoAltoI = None
    PuntoIzquierdoI = None
    puntoDerechoI = None

    # Arreglo de X
    miArreglox = [p1x, p2x, fx, Nx, Sx, Ex, Wx]
    # Ordenar en orden ascendente
    arreglo_ascendentex = sorted(miArreglox)
    # Hallamos la distancia entre los puntos
    distanciax = arreglo_ascendentex[6] - arreglo_ascendentex[0] # tengo la distancia de X
    # Arreglo de y
    miArregloy =  [p1y, p2y, fy, Ny, Sy, Ey, Wy]
    # Ordenar en orden ascendente
    arreglo_ascendentey = sorted(miArregloy)
    # Hallamos la distancia entre los puntos
    distanciay = arreglo_ascendentey[6] - arreglo_ascendentey[0] # tengo la distancia de Y
    Margen = 0.1
    
    # saber que medida es la mas grande
    if(distanciay > distanciax):
        # con respecto a Y
        # distancia que gana
        distancia = distanciay
        Porcentaje = (distancia * Margen) 
        MargenBajoy = (arreglo_ascendentey[0]- Porcentaje) # sin llegar a los 00
        PuntoBajoI = (MargenBajoy // 10) * 10              # comienza con los 00
        cachito = MargenBajoy - PuntoBajoI                 # la distancia del margen al punto ideal
        PuntoAltoI = arreglo_ascendentey[6] + Porcentaje + cachito
        distanciaIdeal = PuntoAltoI - PuntoBajoI           
 
        # Con respecto a X
        PuntoMedioX = (arreglo_ascendentex[6] + arreglo_ascendentex[0]) / 2 # la mitad de la figura en X
        MargenIzquierdoX = PuntoMedioX - (distanciaIdeal / 2)               # armo mi margen sin llegar a los 00          
        PuntoIzquierdoI = (MargenIzquierdoX // 10) * 10                     # llego a mis 00
        Distancia_MargenPI = arreglo_ascendentex[0] - PuntoIzquierdoI
        
        puntoDerechoI = PuntoIzquierdoI +(arreglo_ascendentex[6] - arreglo_ascendentex[0]) +( Distancia_MargenPI*2) 
        
    elif(distanciax > distanciay):
 
        # distancia que gana
        distancia = distanciax
        Porcentaje = (distancia * Margen)
        
        MargenIzquierdoX = (arreglo_ascendentex[0]- Porcentaje)
        PuntoIzquierdoI = (MargenIzquierdoX // 10) * 10              # comienza con los 00
        cachito = MargenIzquierdoX - PuntoIzquierdoI                 # la distancia del margen al punto ideal
        
        puntoDerechoI = arreglo_ascendentex[6] + Porcentaje + cachito
        distanciaIdeal = puntoDerechoI - PuntoIzquierdoI           
         
        # Con respecto a X
        PuntoMedioy = (arreglo_ascendentey[6] + arreglo_ascendentey[0]) / 2 # la mitad de la figura en X
        MargenBajoy = PuntoMedioy - (distanciaIdeal / 2)               # armo mi margen sin llegar a los 00          
        PuntoBajoI = (MargenBajoy // 10) * 10                     # llego a mis 00
        Distancia_MargenPI = arreglo_ascendentey[0] - PuntoBajoI
        PuntoAltoI = PuntoBajoI +(arreglo_ascendentey[6] - arreglo_ascendentey[0]) +( Distancia_MargenPI*2) 
        
    MargenY = (PuntoBajoI, PuntoAltoI)
    MargenX = (PuntoIzquierdoI, puntoDerechoI )
    distancia_espacio = dividir_en_seis(distancia)
    return (MargenX, MargenY, distancia_espacio)

def dividir_en_seis(distancia):
    if distancia is None or distancia == 0:
        return 50
    # Calcula el cociente cuando se divide por 60
    cociente = distancia // 50
    nuevo_total = cociente * 50
    
    # Asegura que el nuevo total sea al menos igual al total original
    if nuevo_total < distancia:
        nuevo_total += 50
    
    # Calcula la escala, dividiendo el nuevo total en 6 partes
    distancia_espaciado = nuevo_total / 5
    respuesta = ajustar_a_múltiplo_cercano(distancia_espaciado)
    return respuesta

def ajustar_a_múltiplo_cercano(escala):
    if 0 <= escala <= 9:
        return 10
    elif 10 <= escala <= 49:
        return 20
    elif 50 <= escala <= 99:
        return 50
    # Agregar rangos extendidos hasta 2000
    elif 100 <= escala <= 199:
        return 100
    elif 200 <= escala <= 299:
        return 200
    elif 300 <= escala <= 399:
        return 300
    elif 400 <= escala <= 499:
        return 400
    elif 500 <= escala <= 599:
        return 500
    elif 600 <= escala <= 699:
        return 600
    elif 700 <= escala <= 799:
        return 700
    elif 800 <= escala <= 899:
        return 800
    elif 900 <= escala <= 999:
        return 900
    elif 1000 <= escala <= 1099:
        return 1000
    elif 1100 <= escala <= 1199:
        return 1100
    elif 1200 <= escala <= 1299:
        return 1200
    elif 1300 <= escala <= 1399:
        return 1300
    elif 1400 <= escala <= 1499:
        return 1400
    elif 1500 <= escala <= 1599:
        return 1500
    elif 1600 <= escala <= 1699:
        return 1600
    elif 1700 <= escala <= 1799:
        return 1700
    elif 1800 <= escala <= 1899:
        return 1800
    elif 1900 <= escala <= 1999:
        return 1900
    elif escala >= 2000:
        return 2000
    else:
        # Manejar casos por debajo de 10
        return 500

def limitesEjes3D( puntoAltoE, puntoAltoW,  puntoBajoE, puntoBajoW, frente):
    (xpuntoAltoE, ypuntoAltoE, zpuntoAltoE) = puntoAltoE
    (xpuntoAltoW, ypuntoAltoW, zpuntoAltoW) = puntoAltoW
    (xpuntoBajoE, ypuntoBajoE, zpuntoBajoE) = puntoBajoE
    (xpuntoBajoW, ypuntoBajoW, zpuntoBajoW) = puntoBajoW
    (xfrente ,    yfrente,     zfrente) = frente
    
    MargenAltoy = None
    MargenBajoy = None
    MargenDerechoX = None
    MargenIzquierdoX = None
    distanciay = None
    distanciax = None
         
######## Generar Puntos x ###########

    ######################## Arreglo de X #############################################
    miArreglox = [xpuntoAltoE, xpuntoAltoW, xpuntoBajoE, xpuntoBajoW, xfrente]
    # Ordenar en orden ascendente
    arreglo_ascendentex = sorted(miArreglox)
    # Hallamos la distancia entre los puntos
    distanciax = arreglo_ascendentex[4] - arreglo_ascendentex[0]
    ######################## Arreglo de y #############################################
    miArregloy = [ypuntoAltoE, ypuntoAltoW, ypuntoBajoE, ypuntoBajoW, yfrente]
    # Ordenar en orden ascendente
    arreglo_ascendentey = sorted(miArregloy)
    # Hallamos la distancia entre los puntos
    distanciay = arreglo_ascendentey[4] - arreglo_ascendentey[0]
   ######################## Arreglo de z #############################################
    miArregloz = [zpuntoAltoE, zpuntoAltoW, zpuntoBajoE, zpuntoBajoW, zfrente]
    # Ordenar en orden ascendente
    arreglo_ascendentez = sorted(miArregloz)
  # Hallamos la distancia entre los puntos
    distanciaz = arreglo_ascendentez[4] - arreglo_ascendentez[0]
    espacioTechoz = distanciaz /1.5
    espacioPisoz = distanciaz / 8.5
    MargenDerechoz = arreglo_ascendentez[4] + espacioTechoz
    MargenIzquierdoz = arreglo_ascendentez[0] - espacioPisoz
    MargenZ = (MargenDerechoz, MargenIzquierdoz)
    
    Margen = 0.1
     # mediox = ((arreglo_ascendentex[6]-arreglo_ascendentex[0])/2)+arreglo_ascendentex[0]
    mediox = ((arreglo_ascendentex[4]+arreglo_ascendentex[0])/2)
    medioy = ((arreglo_ascendentey[4]+arreglo_ascendentey[0])/2)
    # saber que medida es la mas grande
    if(distanciay > distanciax):
        ejes = distanciay / 6
        Porcentaje = (distanciay * Margen)
        MargenAltoy = (arreglo_ascendentey[4]+ Porcentaje)
        MargenBajoy = (arreglo_ascendentey[0]- Porcentaje)
        MargenDerechoX = (mediox + (distanciay/2) + Porcentaje)
        MargenIzquierdoX = (mediox - (distanciay/2) - Porcentaje)
        
    elif(distanciax > distanciay):
        Porcentaje = (distanciay * Margen)
        ejes = distanciax / 6
        MargenDerechoX = (arreglo_ascendentex[4] + (Porcentaje))
        MargenIzquierdoX = (arreglo_ascendentex[0]- Porcentaje)
        MargenAltoy = (medioy + (distanciax / 2) + Porcentaje)
        MargenBajoy = (medioy - (distanciax / 2) -Porcentaje)

    MargenX = (MargenDerechoX, MargenIzquierdoX)
    MargenY = (MargenAltoy, MargenBajoy)
    return (MargenX, MargenY, MargenZ)

def calcular(tipo_cambio_var, monto_inicial_var, moneda_var, resultado_var): # calculo de moneda
    try:
        tipo_cambio = float(tipo_cambio_var.get())
        monto_inicial = float(monto_inicial_var.get())

        if moneda_var.get() == "Dólares":
            resultado = monto_inicial * tipo_cambio
        elif moneda_var.get() == "Euros":
            resultado = monto_inicial / tipo_cambio
        else:
            resultado = 0
        
        resultado_var.set(resultado)
    except ValueError:
        resultado_var.set("Error: Ingrese un monto inicial y tipo de cambio válidos.")

def reproducir_audio(ruta_archivo):
    # Lee el archivo de audio
    audio, frecuencia_muestreo = sf.read(f"./Util/audios/{ruta_archivo}")
    
    # Reproduce el audio
    sd.play(audio, frecuencia_muestreo)
    # sd.wait()
 
def reproducir_mp3():
    # Llamar a la función para reproducir el audio en un hilo separado
    reproducir_audio("InclinacionVeta.mp3")
  
def reproducir_mp3_2():
    # Llamar a la función para reproducir el audio en un hilo separado
    reproducir_audio("Resultados.mp3")
 
def detener_reproduccion():
    print('xd')

def reproducir_Bad(ruta_archivo):
    # Lee el archivo de audio
    audio, frecuencia_muestreo = sf.read(f"./Util/audios/{ruta_archivo}")
    
    # Reproduce el audio
    sd.play(audio, frecuencia_muestreo)
    # sd.wait()
    
