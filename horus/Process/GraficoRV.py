import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import Util.util as util
from matplotlib.ticker import FuncFormatter
from Process.RumboVeta import RumboVeta

class GraficoRV:
    frameCanvas = None
    
    def setGrafico(self, frameCanvas):
        self.frameCanvas = frameCanvas

    def on_scroll(self, event):
        ax = fig.axes[0]
        scale_factor = 0.9 if event.button == 'up' else 1.1  # Reducir o aumentar los límites de los ejes según la dirección del scroll
        xlim = ax.get_xlim()
        ylim = ax.get_ylim()
        x_center = (xlim[0] + xlim[1]) / 2
        y_center = (ylim[0] + ylim[1]) / 2
        new_width = (xlim[1] - xlim[0]) * scale_factor
        new_height = (ylim[1] - ylim[0]) * scale_factor
        ax.set_xlim(x_center - new_width / 2, x_center + new_width / 2)
        ax.set_ylim(y_center - new_height / 2, y_center + new_height / 2)
        canvas.draw_idle()


    def on_press(self, event):
        if event.inaxes:
            ax._pan_start = (event.xdata, event.ydata)
            canvas.get_tk_widget().configure(cursor='hand2')  # Cambiar el cursor a 'hand2' cuando se presione el mouse

    def on_motion(self, event):
        if event.inaxes and hasattr(ax, '_pan_start'):
            x_prev, y_prev = ax._pan_start
            dx = event.xdata - x_prev
            dy = event.ydata - y_prev
            xlim = ax.get_xlim()
            ylim = ax.get_ylim()
            ax.set_xlim(xlim[0] - dx, xlim[1] - dx)
            ax.set_ylim(ylim[0] - dy, ylim[1] - dy)
            canvas.draw_idle()

    def on_release(self, event):
        if hasattr(ax, '_pan_start'):
            del ax._pan_start
            canvas.get_tk_widget().configure(cursor='')  # Restaurar el cursor a su estado normal cuando se libere el mouse

    def Formateador(self, ax):
        formatter = FuncFormatter(self.format_tick)
        ax.xaxis.set_major_formatter(formatter)
        ax.yaxis.set_major_formatter(formatter)

    def format_tick(self, value, tick_number):
        # Esta es una forma simple de convertir los valores de los ejes a enteros.
        # Puedes personalizarlo según tus necesidades.
        return int(value)

    def armarGrafico(self, punto1, punto2, azimut, Rv, caso, frente, titulo, rvPuro):
        try:
            global fig, ax, canvas
              # Crear una figura y ejes
            fig, ax = plt.subplots()

           # Calcular el punto medio
            medio = ((punto1[0] + punto2[0]) / 2, (punto1[1] + punto2[1]) / 2)
            # Calcular la distancia euclidiana
            distancia = np.linalg.norm(np.array(punto2) - np.array(punto1))

            color_punto1 = 'blue'
            color_punto2 = 'red'
            color_frente = 'green'

            # Dibujar la línea entre los dos puntos con marcadores de colores y línea negra
            ax.plot([punto1[0], punto2[0]], [punto1[1], punto2[1]], marker='o', markersize=8, color='black')
            ax.plot(punto1[0], punto1[1], marker='o', color=color_punto1, label=f"Rumbo de Veta: {Rv}")
            ax.plot(punto2[0], punto2[1], marker='o', markersize=8, color=color_punto2, label='P2')
            ax.plot(frente[0], frente[1], marker='o', markersize=8, color=color_frente, label='Frente')

            # Dibujar líneas de norte, sur, este y oeste
            dx = punto2[0] - punto1[0]
            dy = punto2[1] - punto1[1]

            porcentaje_tamano_flecha = 0.5
            tamano_flecha = (porcentaje_tamano_flecha * ((dx ** 2 + dy ** 2) ** 0.5))*2
            # medio[0], medio[1] + tamano_flecha
            Nx = medio[0]
            Ny = medio[1] + tamano_flecha
            N = (Nx, Ny)

            # medio[0] + tamano_flecha, medio[1]
            Ex = medio[0] + tamano_flecha
            Ey =  medio[1]
            E = (Ex, Ey)

            # medio[0], medio[1] - tamano_flecha
            Sx = medio[0]
            Sy = medio[1] - tamano_flecha
            S = (Sx, Sy)

            medio[0] - tamano_flecha, medio[1]
            Wx = medio[0] - tamano_flecha
            Wy =  medio[1]
            W = (Wx, Wy)
 
            # Dibujar la línea entre los dos puntos con línea negra
            line = ax.plot([punto1[0], punto2[0]], [punto1[1], punto2[1]], color='orange', label='Línea de conexión')[0]

            # Título del gráfico
            ax.set_title(  f"\nRumbo de Veta: {Rv}\nAzimut: {round(azimut)}°\nDistancia entre EM y P2: {round(distancia,1)}m")

            # Mostrar información sobre cada punto y la distancia
            EM = r'$\mathbf{EM}$'
            p2 = r'$\mathbf{P2}$'
            F = r'$\mathbf{F}$'

            resp = RumboVeta.ubicacion_Punto(punto1, punto2, titulo, rvPuro, distancia)
            (EEMe, NEMe) = resp[0]
            (EP2e, NP2e) = resp[1]

            ax.text(EEMe, NEMe, f"{EM}", fontsize=8, clip_on=True)# \n
            ax.text(EP2e, NP2e, f"{p2}", fontsize=8, clip_on=True)
            ax.text(frente[0], frente[1], f"\n   {F}", fontsize=8, clip_on=True)

            #ax.arrow(medio[0], medio[1], 0, tamano_flecha, head_width=0.5, head_length=0.5, fc='gray', ec='gray')
            ax.text(medio[0], medio[1] + (tamano_flecha+ (tamano_flecha * 0.1)), 'N', fontsize=10, ha='center', va='bottom', clip_on=True)
            ax.annotate('', xy=(medio[0], (medio[1]+ (tamano_flecha + (tamano_flecha*0.1)))), xytext=(medio[0], medio[1]), arrowprops=dict(arrowstyle='->', color='gray')) #N

            #ax.arrow(medio[0], medio[1], tamano_flecha, 0, head_width=0.5, head_length=0.5,  fc=(0.5, 0.5, 0.5), ec=(0.5, 0.5, 0.5))
            ax.text((medio[0] + tamano_flecha + (tamano_flecha * 0.1)), medio[1], 'E', fontsize=10, ha='left', va='center', clip_on=True)
            ax.annotate('', xy=(medio[0], medio[1]), xytext=(medio[0]+(tamano_flecha + (tamano_flecha*0.1)), medio[1]), arrowprops=dict(arrowstyle='<-', color='gray')) #E
            
            #ax.arrow(medio[0], medio[1], 0, -tamano_flecha, head_width=0.5, head_length=0.5,  fc=(0.5, 0.5, 0.5), ec=(0.5, 0.5, 0.5))
            ax.text(medio[0], medio[1] - (tamano_flecha+ (tamano_flecha * 0.1)), 'S', fontsize=10, ha='center', va='top', clip_on=True)
            ax.annotate('', xy=(medio[0], (medio[1]- (tamano_flecha + (tamano_flecha*0.1)))), xytext=(medio[0], medio[1]), arrowprops=dict(arrowstyle='->', color='gray'))#S

            #ax.arrow(medio[0], medio[1], -tamano_flecha, 0, head_width=0.5, head_length=0.5,  fc=(0.5, 0.5, 0.5), ec=(0.5, 0.5, 0.5))
            ax.text(medio[0] - (tamano_flecha + (tamano_flecha * 0.1)), medio[1], 'W', fontsize=10, ha='right', va='center', clip_on=True)
            ax.annotate('', xy=(medio[0], medio[1]), xytext=(medio[0]-(tamano_flecha + (tamano_flecha*0.1)), medio[1]), arrowprops=dict(arrowstyle='<-', color='gray')) #W
            
            # Establecer los límites de los ejes x e y
            resultadoEjes = util.LimitesGrafico2D(punto1, punto2, frente, N, S, E, W)
            (ejexMenor, ejexMayor) = resultadoEjes[0]
            (ejeyMenor, ejeyMayor) = resultadoEjes[1]
            escala = 100
            # Eliminar la leyenda
            ax.legend().set_visible(False)
            ax.grid(True)
            afrente =(frente[0], frente[1])
            # Ajustar aspecto de los ejes para que se vea como un cuadrado perfecto
            #ax.set_aspect('equal')

            ax.set_xlim(ejexMenor, ejexMayor)  # establece el rango de los valores en el eje x
            ax.set_ylim(ejeyMenor, ejeyMayor)  # establece el rango de los valores en el eje y
            # Aplicar el formateador personalizado para los ejes
            self.Formateador(ax)
            
        
        except ValueError as e:
            print("Error al generar el archivo:", e)
        finally:
            canvas = FigureCanvasTkAgg(fig, master=self.frameCanvas)
            canvas.draw()
            canvas.get_tk_widget().pack(side='top', fill='both', expand=1)
            canvas.mpl_connect('scroll_event', self.on_scroll)
            canvas.mpl_connect('button_press_event', self.on_press)
            canvas.mpl_connect('motion_notify_event', self.on_motion)
            canvas.mpl_connect('button_release_event', self.on_release)
            canvas.draw_idle()
          


