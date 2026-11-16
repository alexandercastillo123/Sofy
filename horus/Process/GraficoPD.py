import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import numpy as np
import Util.util as util
from Process.RumboVeta import RumboVeta
from matplotlib.ticker import FuncFormatter
  
class GraficoPD:
    frameCanvas = None
    
    def setGrafico2D(self, frameCanvas):
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
    def Formateador(self, ax):
        formatter = FuncFormatter(self.format_tick)
        ax.xaxis.set_major_formatter(formatter)
        ax.yaxis.set_major_formatter(formatter)

    def format_tick(self, value, tick_number):
        # Esta es una forma simple de convertir los valores de los ejes a enteros.
        # Puedes personalizarlo según tus necesidades.
        return int(value)

 
    
    def armarGraficoPuntoDireccion(self,Datos, EP, PC, frente,CEP, CPC, PB1 ,PB2, textoProceso, TextoEp_PC):
        try:
            global fig, ax, canvas
            # Crear una figura y ejes
            fig, ax = plt.subplots()
            (DistanciaP, DistanciaD, Rumboperpendicular, RumboDiagonal, txtrDP, txtrDD,zp, zd) = Datos
            
            color_EP = 'blue'
            color_PC = 'red'
            color_frente = 'green'
            color_Proyectada = 'orange'
            arrow_width_factor = 0.003
            resultadoEjes = None
            
            # Calcular la dirección y la longitud de la flecha
            arrow_directionPC = [PC[0] - frente[0], PC[1] - frente[1]]
            arrow_length = np.linalg.norm(arrow_directionPC)
            
            # Calcular la dirección y la longitud de la flecha
            arrow_directionEP = [EP[0] - frente[0], EP[1] - frente[1]]
            arrow_length = np.linalg.norm(arrow_directionEP)
             
            ax.plot([PB1[0], PB2[0]], [PB1[1], PB2[1]], color=color_Proyectada, linestyle='dashed')  
            ax.plot(frente[0], frente[1], marker='o', markersize=6, color=color_frente, label='Frente')
            ax.text(frente[0], frente[1], 'F', horizontalalignment='right', color=color_frente, verticalalignment='bottom', clip_on=True)
            
            # Añadir el texto en el centro de la flecha con rotación y desplazamiento
            arrow_middlePC = [frente[0] + arrow_directionPC[0] / 2, frente[1] + arrow_directionPC[1] / 2] # PERPENDICULAR
            #InfoDP = (arrow_middleEP[0], arrow_middleEP[1])
            CDP = (arrow_middlePC[0], arrow_middlePC[1], Rumboperpendicular, txtrDP)
           
            # Añadir el texto en el centro de la flecha con rotación y desplazamiento
            arrow_middleEP = [frente[0] + arrow_directionEP[0] / 2, frente[1] + arrow_directionEP[1] / 2] # DIAGONAL
            #InfoDP = (arrow_middleEP[0], arrow_middleEP[1])
            CDD = (arrow_middleEP[0], arrow_middleEP[1], RumboDiagonal, txtrDD)
            distancias =(DistanciaP, DistanciaD)
          
            resultados = RumboVeta.Posicion_Etiqueta(CDP, CDD, distancias)

            (TextoFlecha_PC_x, TextoFlecha_PC_y) = resultados [0]
            (TextoFlecha_EP_x, TextoFlecha_EP_y) = resultados [1]
            
            resultadoEjes = util.LimitesGrafico2D( PC, EP, frente,EP, EP,PB1 ,PB2)
            if(txtrDP == "NE" or txtrDP == "SW"):
                rotacionPC = 90 - Rumboperpendicular # PC
            elif(txtrDP == "SE" or txtrDP == "NW"):
                rotacionPC = 270 + Rumboperpendicular # PC
                
            if(txtrDD == "NE" or txtrDD == "SW"):
                
                rotacionEP = 90 - RumboDiagonal # EP
            elif(txtrDD == "SE" or txtrDD == "NW"):
                rotacionEP = 270 + RumboDiagonal # EP
          
            if(TextoEp_PC=="Ambos" ):
                ax.plot(PC[0], PC[1], marker='o', markersize=8, color=color_PC, label='PC')
                ax.plot(EP[0], EP[1], marker='o', markersize=8, color=color_EP, label='EP')
                
                # Dibujar la flecha con grosor graduado
                ax.quiver(frente[0], frente[1], arrow_directionPC[0], arrow_directionPC[1], color=color_PC, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor, headwidth=10)
                ax.quiver(frente[0], frente[1], arrow_directionEP[0], arrow_directionEP[1], color=color_EP, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor, headwidth=10)
                 
                # Añadir texto en los extremos de las flechas
                ax.text(PC[0], PC[1], 'PC', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                ax.text(EP[0], EP[1], 'EP', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                
                # Añadir texto en las flechas
                ax.text(TextoFlecha_EP_x, TextoFlecha_EP_y, f"{round(DistanciaD,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionEP, color=color_EP, clip_on=True)
                ax.text(TextoFlecha_PC_x, TextoFlecha_PC_y, f"{round(DistanciaP,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionPC, color=color_PC, clip_on=True)

            elif(TextoEp_PC=="PC"):
                ax.plot(PC[0], PC[1], marker='o', markersize=8, color=color_PC, label='PC')
                # Dibujar la flecha con grosor graduado
                ax.quiver(frente[0], frente[1], arrow_directionPC[0], arrow_directionPC[1], color=color_PC, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                # Añadir texto en los extremos de las flechas
                ax.text(PC[0], PC[1], 'PC', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                ax.text(TextoFlecha_PC_x, TextoFlecha_PC_y, f"{round(DistanciaP,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionPC, color=color_PC , clip_on=True)

            elif(TextoEp_PC=="EP"):
                ax.plot(EP[0], EP[1], marker='o', markersize=8, color=color_EP, label='EP')
                ax.quiver(frente[0], frente[1], arrow_directionEP[0], arrow_directionEP[1], color=color_EP, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                # Añadir texto en los extremos de las flechas
                ax.text(EP[0], EP[1], 'EP', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                ax.text(TextoFlecha_EP_x, TextoFlecha_EP_y, f"{round(DistanciaD,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionEP, color=color_EP, clip_on=True)
                
            #codigo de PC o EP con ContraPC, ContraEP
            if(textoProceso == "Ambos"):
                # Dibujar la línea entre los dos puntos con marcadores de colores y línea negra
                # PC - Perpendicular
                ax.plot(PC[0], PC[1], marker='o', markersize=6, color=color_PC, label='PC') # creacion del punto
                ax.quiver(frente[0], frente[1], arrow_directionPC[0], arrow_directionPC[1], color=color_PC, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                ax.plot(CPC[0], CPC[1], marker='o', markersize=4, color=color_PC, label='CPC') # creacion del punto
                
                ax.text(CEP[0], CEP[1], 'Estaca 2', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                ax.text(CPC[0], CPC[1], 'Estaca 1', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                
                #EP - Diagonal
                ax.plot(EP[0], EP[1], marker='o', markersize=6, color=color_EP, label='EP')
                ax.quiver(frente[0], frente[1], arrow_directionEP[0], arrow_directionEP[1], color=color_EP, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                ax.plot(CEP[0], CEP[1], marker='o', markersize=4, color=color_EP, label='CEP') # creacion del punto
                # Añadir texto en los extremos de las flechas
                
                 # Añadir texto en las flechas
                ax.text(TextoFlecha_EP_x, TextoFlecha_EP_y, f"{round(DistanciaD,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionEP, color=color_EP, clip_on=True)
                ax.text(TextoFlecha_PC_x, TextoFlecha_PC_y, f"{round(DistanciaP,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionPC, color=color_PC, clip_on=True)
                
                ax.text(PC[0], PC[1], 'PC', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                ax.text(EP[0], EP[1], 'EP', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                
                resultadoEjes = util.LimitesGrafico2D( PC, EP, frente,CEP, CPC,PB1 ,PB2)

            elif(textoProceso == "Perpendicular"):
                # PC - Perpendicular
                ax.plot(PC[0], PC[1], marker='o', markersize=6, color=color_PC, label='PC') # creacion del punto
                ax.quiver(frente[0], frente[1], arrow_directionPC[0], arrow_directionPC[1], color=color_PC, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                ax.plot(CPC[0], CPC[1], marker='o', markersize=4, color=color_PC, label='CPC') # creacion del punto
                
                ax.text(CPC[0], CPC[1], 'Estaca 1', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                
                # Añadir texto en los extremos de las flechas
                ax.text(PC[0], PC[1], 'PC', horizontalalignment='right', color=color_PC, verticalalignment='bottom', clip_on=True)
                # Añadir texto en las flechas
                ax.text(TextoFlecha_PC_x, TextoFlecha_PC_y, f"{round(DistanciaP,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionPC, color=color_PC, clip_on=True)
                resultadoEjes = util.LimitesGrafico2D( PC, EP, frente,CPC, CPC,PB1 ,PB2)

            elif(textoProceso == "Diagonal"):
                #EP - Diagonal
                ax.plot(EP[0], EP[1], marker='o', markersize=6, color=color_EP, label='EP')
                ax.quiver(frente[0], frente[1], arrow_directionEP[0], arrow_directionEP[1], color=color_EP, angles='xy', scale_units='xy', scale=1, width=arrow_width_factor)
                ax.plot(CEP[0], CEP[1], marker='o', markersize=4, color=color_EP, label='CEP') # creacion del punto
               
                ax.text(CEP[0], CEP[1], 'Estaca 2', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                
                # Añadir texto en los extremos de las flechas
                ax.text(EP[0], EP[1], 'EP', horizontalalignment='right', color=color_EP, verticalalignment='bottom', clip_on=True)
                # Añadir texto en las flechas
                ax.text(TextoFlecha_EP_x, TextoFlecha_EP_y, f"{round(DistanciaD,1)}m", horizontalalignment='center', verticalalignment='center', rotation=rotacionEP, color=color_EP, clip_on=True)
                resultadoEjes = util.LimitesGrafico2D( PC, EP, frente,CEP, PB1,PB1 ,PB2)
            # Eliminar la leyenda
            ax.legend().set_visible(False)
            ax.grid(True)
            afrente =(frente[0], frente[1])
            
            (ejexMenor, ejexMayor) = resultadoEjes[0]
            (ejeyMenor, ejeyMayor) = resultadoEjes[1]
            escala = 100
            
            ax.set_xlim(ejexMenor, ejexMayor)  # establece el rango de los valores en el eje x
            ax.set_ylim(ejeyMenor, ejeyMayor)  # establece el rango de los valores en el eje y
 
            # Aplicar el formateador personalizado para los ejes
            self.Formateador(ax)
              
            # Título del gráfico
            ax.set_title(r"$\mathbf{SIMULACIÓN\ 2D\ EN\ TIEMPO\ REAL}$")

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
            

   